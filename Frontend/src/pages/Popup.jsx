import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopup, addPopup, deletePopup } from "../common/popupSlice";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const Popup = () => {
  return (
    <div className="p-6">
      <PopupNavbar />
      <Routes>
        <Route path="/" element={<AdminPopup />} />
        <Route path="/add-popup" element={<AddPopup />} />
      </Routes>
    </div>
  );
};

const PopupNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/admin/popup" className="text-lg font-bold">Popup</Link>
      <Link to="/admin/popup/add-popup" className="bg-white text-black px-4 py-2 rounded">
        {useSelector(state => state.popup.data) ? "Replace Popup" : "Add Popup"}
      </Link>
    </nav>
  );
};

const AdminPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: popup, loading } = useSelector((state) => state.popup);

  useEffect(() => {
    dispatch(fetchPopup());
  }, [dispatch]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this popup?")) {
      dispatch(deletePopup());
    }
  };

  if (loading) {
    return <p className="text-center py-4">Loading popup...</p>;
  }

  return (
    <div className="p-6">
    {popup ? (
      <div className="border-2 border-gray-200 rounded-lg p-6 shadow-md max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left Side - Labels */}
          <div className="md:col-span-1 space-y-6 border-r-0 md:border-r-2 border-gray-200 pr-0 md:pr-6">
            <div className="space-y-6">
              <p className="font-semibold text-gray-700 h-10 flex items-center">Name:-</p>
              <p className="font-semibold text-gray-700 h-40 flex items-center">Image:-</p>
              <p className="font-semibold text-gray-700 h-10 flex items-center">Bonus Link:-</p>
            </div>
          </div>

          {/* Right Side - Content */}
          <div className="md:col-span-3 space-y-6">
            <div className="border-2 border-gray-200 rounded p-3 h-10 flex items-center">
              <h2 className="text-lg font-medium">{popup.name}</h2>
            </div>
            
            <div className="border-2 border-gray-200 rounded p-3 h-40 flex items-center justify-center">
              <img 
                src={popup.image} 
                alt={popup.name} 
                className="max-h-full max-w-full object-contain"
              />
            </div>
            
            <div className="border-2 border-gray-200 rounded p-3 h-10 flex items-center">
              <a 
                href={popup.bonusLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline break-all"
              >
                {popup.bonusLink}
              </a>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 mt-8 pt-6 border-t-2 border-gray-200">
          <button 
            onClick={() => navigate("/admin/popup/add-popup")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            Replace Popup
          </button>
          <button 
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
          >
            Delete Popup
          </button>
        </div>
      </div>
    ) : (
      <div className="text-center py-12 border-2 border-gray-200 rounded-lg max-w-md mx-auto">
        <p className="mb-6 text-lg">No popup currently set up</p>
        <button 
          onClick={() => navigate("/admin/popup/add-popup")}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition"
        >
          Create New Popup
        </button>
      </div>
    )}
  </div>
  );
};

const AddPopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: existingPopup } = useSelector((state) => state.popup);

  const [formData, setFormData] = useState({
    name: "",
    bonusLink: "",
    image: null,
    imageUrl: ""
  });

  const [isUploading, setIsUploading] = useState(false);

  // 👇 Place this right here
  useEffect(() => {
    if (existingPopup) {
      setFormData({
        name: existingPopup.name || "",
        bonusLink: existingPopup.bonusLink || "",
        image: null,
        imageUrl: existingPopup.image || ""
      });
    }
  }, [existingPopup]);


  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    if (!formData.name || !formData.bonusLink || (!formData.image && !formData.imageUrl)) {
      alert("Please fill all required fields!");
      setIsUploading(false);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("bonusLink", formData.bonusLink);
    
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    } else if (formData.imageUrl) {
      formDataToSend.append("image", formData.imageUrl);
    }

    try {
      await dispatch(addPopup(formDataToSend)).unwrap();
      navigate("/admin/popup");
    } catch (error) {
      console.error("Failed to add popup:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        {existingPopup ? "Replace Popup" : "Create New Popup"}
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Popup Name*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
            placeholder="Enter popup name"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Bonus Link*</label>
          <input
            type="url"
            name="bonusLink"
            value={formData.bonusLink}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
            placeholder="Enter bonus link"
          />
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Upload Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="border p-2 w-full rounded"
            accept="image/*"
          />
          <p className="text-sm text-gray-500 mt-1">Or use image URL below</p>
        </div>
        
        <div>
          <label className="block mb-1 font-medium">Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            placeholder="Enter image URL"
          />
        </div>
        
        <div className="flex gap-2 pt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={isUploading}
          >
            {isUploading ? "Processing..." : (existingPopup ? "Replace Popup" : "Create Popup")}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/popup")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
        
        <p className="text-sm text-gray-500">
          *Note: Submitting this form will {existingPopup ? "replace" : "create"} the popup. 
          {existingPopup && " The existing popup will be automatically deleted."}
        </p>
      </form>
    </div>
  );
};

export default Popup;