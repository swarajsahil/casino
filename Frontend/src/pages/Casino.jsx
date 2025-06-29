import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  fetchCasinos, 
  deleteCasino, 
  addCasino, 
  updateCasino 
} from "../common/casinoSlice";
import { Link, Route, Routes, useNavigate } from "react-router-dom";


const Casino = () => {
  return (
    <div className="p-6">
      <CasinoNavbar />
      <Routes>
        <Route path="/" element={<AdminCasino />} />
        <Route path="/add-casino" element={<AddCasino />} />
      </Routes>
    </div>
  );
};

const CasinoNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/admin/casino" className="text-lg font-bold">All Casinos</Link>
      <Link 
        to="/admin/casino/add-casino" 
        className="bg-white text-black px-4 py-2 rounded hover:bg-blue-50 transition-colors"
      >
        Add Casino
      </Link>
    </nav>
  );
};

const AddCasino = ({ existingCasino, setEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [formData, setFormData] = useState(() => {
    if (existingCasino) {
      return {
        ...existingCasino,
        imageUrl: existingCasino.image || '',
        imageFile: null,
      };
    }
    return {
      name: "",
      description: "",
      bonus: "",
      pros: "",
      freeSpins: 0,
      casinoLink: "",
      bonusLink: "",
      dealer: "",
      company: "",
      imageUrl: "",
      imageFile: null
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


    const casinoData = new FormData();
    
    // Append all fields except image sources
    const fields = [
      'name', 'description', 'bonus', 'pros', 'metrics',
      'casinoLink', 'bonusLink', 'dealer', 'company','freeSpins'
    ];
    
    fields.forEach(field => {
      if (formData[field]) casinoData.append(field, formData[field]);
    });


    // Handle image upload
    if (formData.imageUrl) {
      casinoData.append("image", formData.imageUrl);
    } else if (formData.imageFile) {
      casinoData.append("image", formData.imageFile);
    }

    if (existingCasino) {
      dispatch(updateCasino({ 
        id: existingCasino._id, 
        casinoData 
      }));
      setEditing(false);
    } else {
      dispatch(addCasino(casinoData));
    }
    navigate("/admin/casino");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          {existingCasino ? "Edit Casino" : "Create New Casino"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Casino Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter casino name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Welcome Bonus</label>
            <input
              type="text"
              name="bonus"
              value={formData.bonus}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter welcome bonus"
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
              placeholder="Enter casino description"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Pros (comma separated)</label>
            <textarea
              name="pros"
              value={formData.pros}
              onChange={handleChange}
              className="w-full p-2 border rounded h-16"
              placeholder="Enter pros (comma separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Casino URL *</label>
            <input
              type="url"
              name="casinoLink"
              value={formData.casinoLink}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Enter casino URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Bonus Claim URL</label>
            <input
              type="url"
              name="bonusLink"
              value={formData.bonusLink}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter bonus claim URL"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">free Spins</label>
            <input
              type="number"
              name="freeSpins"
              value={formData.freeSpins}
              onChange={handleChange}
              className="w-full p-1 border rounded"
              placeholder="Enter number of free spins"
            />
          </div>
          

          <div>
            <label className="block text-sm font-medium mb-1">Dealer</label>
            <input
              type="text"
              name="dealer"
              value={formData.dealer}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter dealer name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Company</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Enter company name"
            />
          </div>

          <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Casino Image</label>
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
              existingCasino 
                ? "bg-yellow-500 hover:bg-yellow-600" 
                : "bg-blue-500 hover:bg-blue-600"
            } transition-colors`}
          >
            {existingCasino ? "Update Casino" : "Create Casino"}
          </button>
          
          {existingCasino && (
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

const AdminCasino = () => {
  const dispatch = useDispatch();
  const { data: casinos, loading, error } = useSelector((state) => state.casinos);
  const [editingCasino, setEditingCasino] = useState(null);
  useEffect(() => {
    dispatch(fetchCasinos());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this casino?")) {
      dispatch(deleteCasino(id));
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      {editingCasino ? (
        <AddCasino existingCasino={editingCasino} setEditing={setEditingCasino} />
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:grid grid-cols-14 bg-gray-100 p-3 font-bold text-sm">
              <div className="col-span-1 text-center">Image</div>
              <div className="col-span-2 text-center">Name</div>
              <div className="col-span-1 text-center">Bonus</div>
              <div className="col-span-1 text-center">Spins</div>
              <div className="col-span-1 text-center">Dealer</div>
              <div className="col-span-2 text-center">Company</div>
              <div className="col-span-2 text-center">Casino Link</div>
              <div className="col-span-2 text-center">Bonus Link</div>
              <div className="col-span-1 text-center">Actions</div>
            </div>
          
          <div className="divide-y divide-gray-200">
            {casinos && casinos?.map((casino) => (
              <div 
                key={casino._id}
                className="grid grid-cols-1 md:grid-cols-14 gap-2 p-3 hover:bg-gray-50 items-center"
              >
                <div className="col-span-1 flex justify-center">
                  <img 
                    src={casino.image} 
                    alt={casino.name} 
                    className="w-12 h-12 object-cover rounded"
                  />
                </div>
                
                <div className="col-span-2 text-center font-medium">
                  {casino.name}
                </div>
                
                <div className="col-span-1 text-center text-sm">
                  {casino.bonus}
                </div>

                <div className="col-span-1 text-center text-sm">
                  {casino.freeSpins}
                </div>


                <div className="col-span-1 text-center text-sm">
                  {casino.dealer}
                </div>

                <div className="col-span-2 text-center text-sm">
                  {casino.company}
                </div>
                
                <div className="col-span-2 text-center">
                  <a
                    href={casino.casinoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Visit Casino
                  </a>
                </div>
                
                <div className="col-span-2 text-center">
                  {casino.bonusLink && (
                    <a
                      href={casino.bonusLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md inline-block text-sm"
                    >
                      Claim Bonus
                    </a>
                  )}
                </div>
                
                <div className="col-span-1 flex justify-center space-x-2">
                  <button
                    onClick={() => setEditingCasino(casino)}
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
                    onClick={() => handleDelete(casino._id)}
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

export default Casino;