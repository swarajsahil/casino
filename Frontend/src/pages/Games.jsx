import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGames, addGame, updateGame, deleteGame } from "../common/gameSlice";
import { Link, Route, Routes, useNavigate } from "react-router-dom";

const Games = () => {
  return (
    <div className="p-6">
      <GameNavbar />
      <Routes>
        <Route path="/" element={<AdminGames />} />
        <Route path="/add-games" element={<AddGame />} />
      </Routes>
    </div>
  );
};

const GameNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/admin/games" className="text-lg font-bold">All Games</Link>
      <Link to="/admin/games/add-games" className="bg-white text-black px-4 py-2 rounded">Add Game</Link>
    </nav>
  );
};

const AddGame = ({ existingGames, setEditing }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(() => {
      if (existingGames) {
        return {
          ...existingGames,
          imageUrl: existingGames.image || '',
          imageFile: null,
        };
      }
      return {
      gameName: "",
      description: "",
      gameLink: "",
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
    const gameData = new FormData();

    const fields = [
          'gameName', 'description', 'gameLink', 'dealer','company'
        ];
        
        fields.forEach(field => {
          if (formData[field]) gameData.append(field, formData[field]);
        });
    
    
        // Handle image upload
        if (formData.imageUrl) {
          gameData.append("image", formData.imageUrl);
        } else if (formData.imageFile) {
          gameData.append("image", formData.imageFile);
        }
    
        if (existingGames) {
          dispatch(updateGame({ 
            id: existingGames._id, 
            gameData 
          }));
          setEditing(false);
        } else {
          dispatch(addGame(gameData));
        }
        navigate("/admin/games");
      };


  return (
    <div className="p-6 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
        <h2 className="text-2xl font-bold mb-4">
          {existingGames ? "Edit Game" : "Create New Game"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Game Name *</label>
            <input
              type="text"
              name="gameName" 
              placeholder="Enter Game Name" 
              value={formData.gameName}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              name="description" 
              placeholder="Enter Description"
              required 
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>


          <div>
            <label className="block text-sm font-medium mb-1">Game URL *</label>
            <input
              type="url"
              name="gameLink" 
              placeholder="Enter Game URL" 
              value={formData.gameLink}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
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
              placeholder="Enter Dealer Name"
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
              placeholder="Enter Company Name"
            />
          </div>

          <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Game Image</label>
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
              existingGames 
                ? "bg-yellow-500 hover:bg-yellow-600" 
                : "bg-blue-500 hover:bg-blue-600"
            } transition-colors`}
          >
            {existingGames ? "Update Games" : "Create Games"}
          </button>
          
          {existingGames && (
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

const AdminGames = () => {
  const dispatch = useDispatch();
  const { data:games, loading, error } = useSelector((state) => state.games);
  const [editingGames, setEditingGames] = useState(null);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);


  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this Game?")) {
    dispatch(deleteGame(id));
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
    {editingGames ? (
      <AddGame existingGames={editingGames} setEditing={setEditingGames} />
    ) : (
      <div className="w-full bg-white rounded-lg shadow-md p-4">
        <div className="flex bg-gray-100 text-gray-800 font-bold p-2 rounded-t-lg">
          <div className="w-1/7 text-center">Image</div>
          <div className="w-1/7 text-center">Name</div>
          <div className="w-1/7 text-center">Description</div>
          <div className="w-1/7 text-center">Game Link</div>
          <div className="w-1/7 text-center">Dealer</div>
          <div className="w-1/7 text-center">Company</div>
          <div className="w-1/7 text-center">Actions</div>
        </div>
        <div className="divide-y divide-gray-300">
          {games?.map((game) => (
            <div key={game._id} className="flex items-center p-2">
              <div className="w-1/7 flex justify-center">
                <img src={game.image} alt={game.title} className="w-12 h-12 object-cover rounded" />
              </div>
              <div className="w-1/7 text-center">{game.gameName}</div>
              <div className="w-1/7 text-center">{game.description}</div>
              <div className="w-1/7 text-center">{game.gameLink}</div>
              <div className="w-1/7 text-center">{game.dealer}</div>
              <div className="w-1/7 text-center">{game.company}</div>
              <div className="w-1/7 flex justify-center space-x-2">

                <button onClick={() => setEditingGames(game)} className="text-blue-400 p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(game._id)} className="text-red-800 p-1 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
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



export default Games;

