import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCasinos } from "../common/casinoSlice";
import { fetchBlogs } from '../common/blogSlice';
import { fetchGames } from '../common/gameSlice';
import { fetchAllReviews } from '../common/reviewSlice';


const Dashboard = () => {
  const dispatch = useDispatch();
  const {data:casinos} = useSelector((state) => state.casinos);
  const { data: blogs } = useSelector((state) => state.blogs);
  const {data:games} = useSelector((state) => state.games);
  const  {allReviews}  = useSelector((state) => state.reviews);

  
    useEffect(() => {
      dispatch(fetchAllReviews());
    }, [dispatch]);

    useEffect(() => {
      dispatch(fetchGames());
    }, [dispatch]);

    useEffect(() => {
      dispatch(fetchBlogs());
    }, [dispatch]);

  useEffect(() => {
    dispatch(fetchCasinos());
  }, [dispatch]);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-blue-500 p-6 rounded-lg text-white">
          <h2 className="text-xl font-bold">Total Blogs</h2>
          <p className="text-2xl">{blogs?.length}</p>
        </div>
        <div className="bg-green-500 p-6 rounded-lg text-white">
          <h2 className="text-xl font-bold">Total Casinos</h2>
          <p className="text-2xl">{casinos?.length}</p>
        </div>
        <div className="bg-purple-500 p-6 rounded-lg text-white">
          <h2 className="text-xl font-bold">Total Games</h2>
          <p className="text-2xl">{games?.length}</p>
        </div>
        <div className="bg-red-500 p-6 rounded-lg text-white">
          <h2 className="text-xl font-bold">Total Reviews</h2>
          <p className="text-2xl">{allReviews?.length}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;