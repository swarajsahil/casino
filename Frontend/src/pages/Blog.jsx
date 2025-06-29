import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, addBlog, updateBlog, deleteBlog, fetchBlogsById } from "../common/blogSlice";
import { Routes, Route, Link, useNavigate, useLocation, useParams } from "react-router-dom";

const Blog = () => {
  const [editingBlog, setEditingBlog] = useState(null);
  return (
    <div className="p-6">
      <BlogNavbar />
      <Routes>
      <Route path="/" element={<AdminBlog editingBlog={editingBlog} setEditingBlog={setEditingBlog} />} />
        <Route path="/add-blog" element={<AddBlog />} />
        <Route path="/details/:id" element={<BlogDetails setEditingBlog={setEditingBlog} />} />
      </Routes>
    </div>
  );
};

const BlogNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/admin/blog" className="text-lg font-bold">All Blogs</Link>
      <Link to="/admin/blog/add-blog" className="bg-white text-black px-4 py-2 rounded">Add Blog</Link>
    </nav>
  );
};

const AdminBlog = ({ editingBlog, setEditingBlog }) => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { data: blogs, loading ,error} = useSelector((state) => state.blogs);
  // const [editingBlog, setEditingBlog] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  // const handleEdit = (blog) => {
  //   navigate("/admin/blog/add-blog", { state: { isEdit: true, blog } });
  // };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Blog?")) {
    dispatch(deleteBlog(id));
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      {editingBlog ? (
        <AddBlog existingBlog={editingBlog} setEditing={setEditingBlog} />
      ) : (
        <ul>
          {blogs.map((blog, index) => (
            <li key={blog._id || index} className="flex justify-between items-center p-2 border-b">
              <div>
                <h3 className="text-xl">{blog.title}</h3>
                <p className="text-gray-500">{blog.description}</p>
              </div>
              
              <div className="flex gap-1 flex-col">
              <div className="bg-red-500 text-white w-18 text-center rounded-2xl">
              <Link 
                  to={`/admin/blog/details/${blog._id}`}>
                  Expand
                </Link>
              </div>
              <div className="flex justify-center">
                <button onClick={() => setEditingBlog(blog)} className=" text-blue-400 px-1 py-1 rounded mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(blog._id)} className=" text-red-800 px-1 py-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                  </svg>
                </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AddBlog = ({ existingBlog, setEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();
  // const isEditMode = location.state?.isEdit || false;
  // const existingBlog = location.state?.blog || {};

  const [formData, setFormData] = useState(()=>{
    if (existingBlog) {
      return {
        ...existingBlog,
        imageUrl: existingBlog.image || '',
        imageFile: null,
      };
    }
    return {
    title: "",
    author: "",
    description: "",
    keyTakeaways: "",
    content: "",
    imageUrl: "",
    imageFile: null
    }
  });

  // useEffect(() => {
  //   if (isEditMode) {
  //     setFormData(existingBlog);
  //   }
  // }, [isEditMode, existingBlog]);

  // const handleChange = (e) => {
  //   const { name, value, files } = e.target;
  //   setFormData((prev) => ({
  //     ...prev,
  //     [name]: files ? files[0] : value, // Handle both text inputs and file input
  //   }));
  // };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "imageFile") {
      setFormData(prev => ({
        ...prev, 
        imageFile: e.target.files[0],
        imageUrl: ""
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const blogData = new FormData();

    // Append all fields except image sources
    const fields = [
      'author', 'description', 'title', 'keyTakeAways', 'content'
    ];

    fields.forEach(field => {
      if (formData[field]) blogData.append(field, formData[field]);
    });

    // Handle image upload
    if (formData.imageUrl) {
      blogData.append("image", formData.imageUrl);
    } else if (formData.imageFile) {
      blogData.append("image", formData.imageFile);
    }

    if (existingBlog) {
          dispatch(updateBlog({ 
            id: existingBlog._id, 
            blogData 
          }));
          setEditing(false);
        } else {
          dispatch(addBlog(blogData));
        }
        navigate("/admin/blog");
      };
    

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4 flex flex-col gap-2">
      <h2 className="text-2xl font-bold mb-4">
          {existingBlog ? "Edit Casino" : "Create New Casino"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Blog Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Blog Author *</label>
            <input
              type="text"
              name="author" 
              placeholder="Author" 
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Blog Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="w-full p-2 border rounded h-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Blog Content *</label>
            <textarea
              name="content" 
              placeholder="Content" 
              value={formData.content}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded h-24"
            />
          </div>
          <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Blog Image</label>
          <div className="space-y-2">
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={formData.imageUrl || ''} // Ensure always has value
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
            <p className="text-center text-gray-500">OR</p>
            <input
              type="file"
              name="imageFile"
              onChange={handleChange}
              className="w-full p-2 border rounded"
              accept="image/*"
            />
          </div>
        </div>
          </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            type="submit"
            className={`px-6 py-2 rounded text-white ${
              existingBlog 
                ? "bg-yellow-500 hover:bg-yellow-600" 
                : "bg-blue-500 hover:bg-blue-600"
            } transition-colors`}
          >
            {existingBlog ? "Update Blog" : "Create Blog"}
          </button>
          
          {existingBlog && (
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const BlogDetails = ({ setEditingBlog }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { selectedBlog, loading } = useSelector((state) => state.blogs);

useEffect(() => {
  dispatch(fetchBlogsById(id));
}, [dispatch, id]);


if (loading) {
  return <p className="text-center text-xl font-semibold">Loading...</p>;
}

if (!selectedBlog) {
  return <p className="text-center text-xl font-semibold">Blog not found</p>;
}

const handleEdit = (selectedBlog) => {
  setEditingBlog(selectedBlog);
  navigate("/admin/blog");
};

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this Blog?")) {
    dispatch(deleteBlog(id));
    navigate("/admin/blog");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{selectedBlog.title}</h1>
      <p className="text-gray-600 mb-4">{selectedBlog.description}</p>
      <p className="text-gray-500 text-sm mb-2">By <span className="font-semibold">{selectedBlog.author}</span></p>
      <img
        src={selectedBlog.image}
        alt={selectedBlog.title}
        className="w-28 h-28 rounded-lg shadow-md mb-4"
      />
      <h2 className="text-2xl font-semibold mt-4">Key Takeaways</h2>
      <ul className="list-disc list-inside mt-2 mb-4">
        {selectedBlog.keyTakeaways.map((point, index) => (
          <li key={index} className="text-gray-700">{point}</li>
        ))}
      </ul>
      <h2 className="text-2xl font-semibold mt-4">Content</h2>
      {selectedBlog.content.map((para, index) => (
        <p key={index} className="text-gray-700 mt-2">{para}</p>
      ))}
      <p className="text-gray-400 text-sm mt-6">Published on: {new Date(selectedBlog.createdAt).toLocaleDateString()}</p>
      <div className="mt-4 flex gap-2">
      <button onClick={() => handleEdit(selectedBlog)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
        <button onClick={handleDelete} className="bg-red-600 text-white px-4 py-2 rounded">Delete</button>
      </div>
    </div>
  );
};

export default Blog;
