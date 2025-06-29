import React, { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import { casinos } from "../config";
import useFetch from "../hooks/useFetch";
import BlogPageLoader from "./BlogPageLoader";
const BlogPage = () => {
    const API_URL=import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const { data} = useFetch(`${API_URL}/api/blogs/${id}`,{id});
    const { data: blog, loading } = useFetch(`${API_URL}/api/blogs`);
    
    const formatDate = (date) => {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0'); // Adding leading zero
        const day = newDate.getDate().toString().padStart(2, '0'); // Adding leading zero
        return `${year}-${month}-${day}`; // Format as 'YYYY-MM-DD'
    };

    
    return (
        (loading)?(<BlogPageLoader/>) : // Ensure data is loaded before rendering
        <div className="bg-gray-100 p-6 min-h-screen">
            {/* Blog Page Container */}
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
                {/* Blog Main Content */}
                <div className="lg:w-2/3">
                    {/* Blog Title */}
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">
                        {data?.blogs?.title} {/* Display dynamic title */}
                    </h1>

                    {/* Author and Date */}
                    <p className="text-sm text-gray-600 mb-4">
                        by <span className="font-semibold">{data?.blogs?.author}</span> • {formatDate(data?.blogs?.createdAt)}
                    </p>

                    {/* Blog Description */}
                    <p className="text-lg text-gray-700">
                        {data?.blogs?.description}
                    </p>

                    {/* Blog Image */}
                    <img
                        src={data?.blogs?.image || 'default-image-url'}  // Use a fallback image if there's no image in the API response
                        alt={data?.blogs?.title}
                        className="rounded-lg my-6 object-cover"
                    />

                    {/* Key Takeaways */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            Key Takeaways:
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {data?.blogs?.keyTakeaways?.map((takeaway, index) => (
                                <li key={index}>{takeaway}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Blog Content */}
                    <div className="text-gray-700 mb-4">
                        {data?.blogs?.content?.map((paragraph, index) => (
                            <p key={index} className="mb-4">{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar (Latest News & Casino Promo) */}
                <div className="flex flex-col gap-3">
                    {/* Latest Blog */}
                    <h4 className="text-2xl font-bold">Latest Blog</h4>
                    <div className="flex flex-col gap-5">
                        <div className="w-96 h-96 flex flex-col gap-2">
                            {blog?.blogs && blog?.blogs?.slice(0, 3)?.map((blog, index) => (
                                <Link
                                style={{ height: "auto"}}
                                    key={index}
                                    to={`/blogs/${blog?._id}`} // Wrap the whole card in a Link
                                    className=" flex bg-white  shadow-md overflow-hidden rounded-lg  hover:shadow-lg transition-shadow duration-300 relative"
                                >

                                    {/* Image */}
                                    <img
                                        src={blog?.image}
                                        alt={blog?.title}
                                        className="w-40 h-36 object-cover rounded-t-lg"
                                    />

                                    {/* Date Badge */}
                                    <div className="absolute bottom-0 left-0 bg-purple-700 text-white text-xs px-3 py-1 rounded-tr-lg">
                                        {formatDate(blog?.createdAt)}
                                    </div>
                                    {/* Content */}
                                    <div className="flex flex-col justify-center p-3 gap-1">
                                        <h6 className="text-xs font-bold text-gray-800">{blog?.title}</h6>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Casino Promos */}
                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                        Casino Promo
                    </h4>
                        {casinos?.map((item, index) => (
                            <div key={index} className="flex flex-col items-start space-y-1">
                                <div className="flex w-[400px] h-40 justify-start items-center rounded-lg bg-white shadow">
                                    <div className="flex w-40 h-20 items-center justify-center">
                                        <img
                                            src={item.logo}
                                            alt={item.name}
                                            className="w-16 h-16 mr-4 rounded-full"
                                        />
                                    </div>
                                    <div className="flex flex-col justify-center w-56 text-sm font-semibold space-y-1">
                                        <h5 className="text-sm">{item.name}:</h5>
                                        <div className="flex flex-col">
                                            <p className="text-lg">Bonus: ₹{item.bonus}</p>
                                            <p className="text-sm">+ {item.freeSpins} Free Spins</p>
                                        </div>
                                        <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-40">
                                            {item.buttonText}
                                        </button>
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 pl-2">
                                    18+ | Play Responsibly | gamblingtherapy.org | T&amp;Cs Apply
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default BlogPage;

