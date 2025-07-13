import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchFAQs,
  addFAQ, 
  updateFAQ, 
  deleteFAQ,
} from "../common/faqSlice";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

const FAQ = () => {
  const [editingFAQ, setEditingFAQ] = useState(null);
  return (
    <div className="p-6">
      <FAQNavbar />
      <Routes>
        <Route path="/" element={<AdminFAQ editingFAQ={editingFAQ} setEditingFAQ={setEditingFAQ} />} />
        <Route path="/add-faq" element={<AddFAQ />} />
      </Routes>
    </div>
  );
};

const FAQNavbar = () => {
  return (
    <nav className="bg-purple-600 text-white p-4 flex justify-between">
      <Link to="/admin/faq" className="text-lg font-bold">All FAQs</Link>
      <Link to="/admin/faq/add-faq" className="bg-white text-black px-4 py-2 rounded font-medium">
        Add FAQ
      </Link>
    </nav>
  );
};

const AdminFAQ = ({ editingFAQ, setEditingFAQ }) => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.faq);

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      dispatch(deleteFAQ(id));
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      {editingFAQ ? (
        <AddFAQ existingFAQ={editingFAQ} setEditing={setEditingFAQ} />
      ) : (
        <ul className="space-y-4">
          {data?.data?.map((faq) => (
            <li key={faq._id} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{faq.question}</h3>
                  <p className="text-gray-600 mt-1 line-clamp-2">{faq.answer}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(faq.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setEditingFAQ(faq)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(faq._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

const AddFAQ = ({ existingFAQ, setEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    question: "",
    answer: ""
  });

  useEffect(() => {
    if (existingFAQ) {
      setFormData({
        question: existingFAQ.question,
        answer: existingFAQ.answer
      });
    }
  }, [existingFAQ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (existingFAQ) {
      dispatch(updateFAQ({ 
        id: existingFAQ._id, 
        updatedData: formData 
      }));
      setEditing(null);
    } else {
      dispatch(addFAQ(formData));
    }
    navigate("/admin/faq");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        {existingFAQ ? "Edit FAQ" : "Add New FAQ"}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Question *
          </label>
          <input
            type="text"
            name="question"
            value={formData.question}
            onChange={handleChange}
            placeholder="Enter question"
            required
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Answer *
          </label>
          <textarea
            name="answer"
            value={formData.answer}
            onChange={handleChange}
            placeholder="Enter detailed answer"
            required
            rows={6}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => existingFAQ ? setEditing(null) : navigate("/admin/faq")}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            {existingFAQ ? "Update FAQ" : "Save FAQ"}
          </button>
        </div>
      </form>
    </div>
  );
};


export default FAQ;