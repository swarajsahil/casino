import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchPromotion, 
  deletePromotion, 
  addPromotion, 
  updatePromotion 
} from "../common/promotionSlice";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

const BottomPopup = () => {
  return (
    <div className="p-6">
      <BottomPopupNavbar />
      <Routes>
        <Route path="/" element={<AdminBottomPopup />} />
        <Route path="/add-bottompopup" element={<AddBottomPopup />} />
      </Routes>
    </div>
  );
};

const BottomPopupNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/admin/bottompopup" className="text-lg font-bold">All Promotions</Link>
      <Link 
        to="/admin/bottompopup/add-bottompopup" 
        className="bg-white text-black px-4 py-2 rounded hover:bg-blue-50 transition-colors"
      >
        Add Promotion
      </Link>
    </nav>
  );
};

const AddBottomPopup = ({ existingPromotion, setEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
    if (existingPromotion) {
      return {
        ...existingPromotion,
        imageUrl: existingPromotion.image || '',
        imageFile: null,
      };
    }
    return {
      title: "",
      description: "",
      Bonuslink: "",
      bonus: "",
      imageUrl: "",
      imageFile: null,
      isActive: true
    };
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const promotionData = new FormData();
    
    // Append all fields except image sources
    const fields = ['title', 'description', 'Bonuslink','bonus', 'isActive'];
    
    fields.forEach(field => {
      if (formData[field]) promotionData.append(field, formData[field]);
    });

    // Handle image upload
    if (formData.imageUrl) {
      promotionData.append("image", formData.imageUrl);
    } else if (formData.imageFile) {
      promotionData.append("image", formData.imageFile);
    }

    if (existingPromotion) {
      dispatch(updatePromotion({ 
        id: existingPromotion._id, 
        updatedData: promotionData 
      }));
      setEditing(false);
    } else {
      dispatch(addPromotion(promotionData));
    }
    navigate("/admin/bottompopup");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          {existingPromotion ? "Edit Promotion" : "Create New Promotion"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter promotion title"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded h-24"
              placeholder="Enter promotion description"
            />
          </div>

            <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Bonus *</label>
            <input
            type="text"
              name="bonus"
              value={formData.bonus}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter promotion bonus"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Bonuslink *</label>
            <input
              type="url"
              name="Bonuslink"
              value={formData.Bonuslink}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter promotion URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="isActive"
              value={formData.isActive}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1">Promotion Image</label>
            <div className="space-y-2">
              <input
                type="text"
                name="imageUrl"
                placeholder="Image URL"
                value={formData.imageUrl || ''}
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
              existingPromotion 
                ? "bg-yellow-500 hover:bg-yellow-600" 
                : "bg-blue-500 hover:bg-blue-600"
            } transition-colors`}
          >
            {existingPromotion ? "Update Promotion" : "Create Promotion"}
          </button>
          
          {existingPromotion && (
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

const AdminBottomPopup = () => {
  const dispatch = useDispatch();
  const { promotion: promotions, loading, error } = useSelector((state) => state.promotion);
  const [editingPromotion, setEditingPromotion] = useState(null);
  
  useEffect(() => {
    dispatch(fetchPromotion());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this promotion?")) {
      dispatch(deletePromotion(id));
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      {editingPromotion ? (
        <AddBottomPopup existingPromotion={editingPromotion} setEditing={setEditingPromotion} />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="hidden md:grid grid-cols-12 bg-gray-100 p-3 font-bold text-sm">
            <div className="col-span-1 text-center">Image</div>
            <div className="col-span-2 text-center">Title</div>
            <div className="col-span-4 text-center">Bonus</div>
            <div className="col-span-2 text-center">Link</div>
            <div className="col-span-1 text-center">Status</div>
            <div className="col-span-2 text-center">Actions</div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {promotions && promotions?.map((promotion) => (
              <div 
                key={promotion._id}
                className="grid grid-cols-1 md:grid-cols-12 gap-2 p-3 hover:bg-gray-50 items-center"
              >
                <div className="col-span-1 flex justify-center">
                  <img 
                    src={promotion.image} 
                    alt={promotion.title} 
                    className="w-12 h-12 object-cover rounded"
                  />
                </div>
                
                <div className="col-span-2 text-center font-medium">
                  {promotion.title}
                </div>
                
                <div className="col-span-4 text-center text-sm">
                  {promotion.bonus}
                </div>

                <div className="col-span-2 text-center">
                  <a
                    href={promotion.Bonuslink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Visit Link
                  </a>
                </div>

                <div className="col-span-1 text-center">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    promotion.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {promotion.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div className="col-span-2 flex justify-center space-x-2">
                  <button
                    onClick={() => setEditingPromotion(promotion)}
                    className="text-blue-500 hover:text-blue-600"
                    title="Edit"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={() => handleDelete(promotion._id)}
                    className="text-red-500 hover:text-red-600"
                    title="Delete"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomPopup;