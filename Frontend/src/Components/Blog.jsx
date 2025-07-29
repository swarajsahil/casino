import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SkeletonLoader from "./SkeletonLoader";

const Blog = ({ data, loading }) => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [showForm, setShowForm] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    content: "",
    imageUrl: "",
    image: null,
    keyTakeaways: [""]
  });
  const [imageError, setImageError] = useState("");

  const formatDate = (date) => {
    const newDate = new Date(date);
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imageUrl: "" // Clear URL if file is selected
      }));
      setImageError("");
    }
  };

  const handleKeyTakeawayChange = (index, value) => {
    const newKeyTakeaways = [...formData.keyTakeaways];
    newKeyTakeaways[index] = value;
    setFormData(prev => ({
      ...prev,
      keyTakeaways: newKeyTakeaways
    }));
  };

  const addKeyTakeaway = () => {
    setFormData(prev => ({
      ...prev,
      keyTakeaways: [...prev.keyTakeaways, ""]
    }));
  };

  const removeKeyTakeaway = (index) => {
    const newKeyTakeaways = formData.keyTakeaways.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      keyTakeaways: newKeyTakeaways
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate image (either URL or file must be provided)
    if (!formData.imageUrl && !formData.image) {
      setImageError("Please provide either an image URL or upload an image file");
      return;
    }
    
    try {
      const formDataToSend = new FormData();
      
      // Append all text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('author', formData.author);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('content', formData.content);
      formData.keyTakeaways.forEach((takeaway, index) => {
        formDataToSend.append(`keyTakeaways[${index}]`, takeaway);
      });
      
      // Append image (either URL or file)
      if (formData.imageUrl) {
        formDataToSend.append('image', formData.imageUrl);
      } else if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await fetch(`${API_URL}/api/newBlogs`, {
        method: 'POST',
        body: formDataToSend, // Let browser set Content-Type with boundary
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit blog');
      }

      const result = await response.json();
      console.log("Blog submitted successfully:", result);
      
      setShowSuccessPopup(true);
      setShowForm(false);
      setFormData({
        title: "",
        author: "",
        description: "",
        keyTakeaways: [""],
        content: "",
        imageUrl: "",
        image: null,
      });
    } catch (error) {
      console.error("Error submitting blog:", error);
      alert(error.message || "Error submitting blog. Please try again.");
    }
  };

  const SuccessPopup = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center animate-fade-in">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Blog Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your submission. It will be visible after admin approval.
          </p>
          <button
            onClick={() => setShowSuccessPopup(false)}
            className="px-6 py-3 bg-[#70084E] text-white rounded-xl hover:bg-[#5a063d] transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    (loading)?(<SkeletonLoader/>):
    <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 min-h-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4 ">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-[#70084E]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 ml-3">
              Latest Blog
            </h1>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#70084E] hover:bg-[#5a063d] text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-md flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Blog Post
          </button>
        </div>

        {/* Blog Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Create New Blog Post</h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  &times;
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blog Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter blog title"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#70084E] focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Author *</label>
                    <input
                      type="text"
                      name="author"
                      placeholder="Author name"
                      value={formData.author}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#70084E] focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief description of your blog"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#70084E] focus:border-transparent transition-all h-32"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                    <textarea
                      name="content"
                      placeholder="Write your blog content here"
                      value={formData.content}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#70084E] focus:border-transparent transition-all h-48"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Key Takeaways</label>
                    <div className="space-y-3">
                      {formData.keyTakeaways.map((takeaway, index) => (
                        <div key={index} className="flex gap-3 items-center">
                          <input
                            type="text"
                            value={takeaway}
                            onChange={(e) => handleKeyTakeawayChange(index, e.target.value)}
                            placeholder={`Key point ${index + 1}`}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#70084E] focus:border-transparent"
                          />
                          {formData.keyTakeaways.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeKeyTakeaway(index)}
                              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addKeyTakeaway}
                        className="text-sm text-[#70084E] hover:text-[#5a063d] font-medium flex items-center gap-1 mt-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Key Takeaway
                      </button>
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Featured Image *</label>
                    <div className="space-y-3">
                      <input
                        type="text"
                        name="imageUrl"
                        placeholder="Paste image URL here"
                        value={formData.imageUrl}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#70084E] focus:border-transparent transition-all"
                        disabled={formData.image}
                      />
                      <div className="relative flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="flex-shrink mx-4 text-gray-500">OR</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Image</label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col w-full h-32 border-2 border-dashed rounded-xl hover:bg-gray-50 transition-colors cursor-pointer">
                            <div className="flex flex-col items-center justify-center pt-7">
                              {formData.image ? (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <p className="pt-1 text-sm text-gray-500">{formData.image.name}</p>
                                </>
                              ) : (
                                <>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                  </svg>
                                  <p className="pt-1 text-sm text-gray-500">Click to upload or drag and drop</p>
                                </>
                              )}
                            </div>
                            <input 
                              type="file" 
                              name="imageFile" 
                              className="opacity-0 absolute" 
                              accept="image/*"
                              onChange={handleFileChange}
                              disabled={formData.imageUrl}
                            />
                          </label>
                        </div>
                      </div>
                      {imageError && (
                        <p className="text-red-500 text-sm mt-1">{imageError}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#70084E] text-white rounded-xl hover:bg-[#5a063d] transition-all duration-300 shadow-md"
                  >
                    Submit Blog Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {data?.map((blog, index) => (
            <Link
              key={blog._id || index}
              to={`/blogs/${blog._id}`}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-[#70084E] text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                  {formatDate(blog.createdAt)}
                </div>
                {!blog.approved && (
                  <div className="absolute top-4 right-4 bg-yellow-500 text-white text-xs font-medium px-3 py-1 rounded-full shadow">
                    Pending Approval
                  </div>
                )}
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#70084E] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                  {blog.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-sm text-gray-500">By {blog.author}</span>
                  <div className="text-[#70084E] text-sm font-medium flex items-center">
                    Read more
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {showSuccessPopup && <SuccessPopup />}
      </div>
    </div>
  );
};

export default Blog;

