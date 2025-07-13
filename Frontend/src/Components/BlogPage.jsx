import React from "react";
import { useParams, Link } from 'react-router-dom';
import { casinos } from "../config";
import useFetch from "../hooks/useFetch";
import BlogPageLoader from "./BlogPageLoader";

const BlogPage = () => {
    const API_URL = import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const { data } = useFetch(`${API_URL}/api/blogs/${id}`, { id });
    const { data: blog, loading } = useFetch(`${API_URL}/api/blogs`);
    
    const formatDate = (date) => {
        const newDate = new Date(date);
        const year = newDate.getFullYear();
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const day = newDate.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    if (loading) return <BlogPageLoader />;

    return (
        <div className="bg-gray-100 min-h-screen p-4 md:p-6">
            {/* Main Container - centered on desktop */}
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Blog Main Content - takes full width on mobile, 2/3 on desktop */}
                <div className="w-full lg:w-2/3 bg-white p-4 md:p-6 rounded-lg shadow-sm">
                    {/* Blog Title */}
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                        {data?.blogs?.title}
                    </h1>

                    {/* Author and Date */}
                    <p className="text-sm text-gray-600 mb-4">
                        by <span className="font-semibold">{data?.blogs?.author}</span> • {formatDate(data?.blogs?.createdAt)}
                    </p>

                    {/* Blog Description */}
                    <p className="text-base md:text-lg text-gray-700 mb-4">
                        {data?.blogs?.description}
                    </p>

                    {/* Blog Image */}
                    <img
                        src={data?.blogs?.image || 'default-image-url'}
                        alt={data?.blogs?.title}
                        className="w-full h-auto rounded-lg my-4 md:my-6 object-cover"
                    />

                    {/* Key Takeaways */}
                    <div className="mb-6">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                            Key Takeaways:
                        </h2>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                            {data?.blogs?.keyTakeaways?.map((takeaway, index) => (
                                <li key={index} className="text-sm md:text-base">{takeaway}</li>
                            ))}
                        </ul>
                    </div>

                    {/* Blog Content */}
                    <div className="text-gray-700">
                        {data?.blogs?.content?.map((paragraph, index) => (
                            <p key={index} className="mb-4 text-sm md:text-base">{paragraph}</p>
                        ))}
                    </div>
                </div>

                {/* Right Sidebar - hidden on mobile if not enough space, appears below content */}
                <div className="w-full lg:w-1/3 flex flex-col gap-6">
                    {/* Latest Blog Section */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                            Latest Blog
                        </h4>
                        <div className="flex flex-col gap-4">
                            {blog?.blogs?.slice(0, 3)?.map((blogItem, index) => (
                                <Link
                                    key={index}
                                    to={`/blogs/${blogItem?._id}`}
                                    className="flex bg-white shadow hover:shadow-md transition-shadow duration-300 rounded-lg overflow-hidden"
                                >
                                    {/* Image */}
                                    <div className="w-1/3 min-w-[100px]">
                                        <img
                                            src={blogItem?.image}
                                            alt={blogItem?.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    
                                    {/* Content */}
                                    <div className="w-2/3 p-3 relative">
                                        <div className="absolute top-0 left-0 bg-purple-700 text-white text-xs px-2 py-1 rounded-br-lg">
                                            {formatDate(blogItem?.createdAt)}
                                        </div>
                                        <h6 className="text-sm font-bold text-gray-800 mt-4 line-clamp-2">
                                            {blogItem?.title}
                                        </h6>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Casino Promos Section */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h4 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                            Casino Promo
                        </h4>
                        <div className="flex flex-col gap-4">
                            {casinos?.map((item, index) => (
                                <div key={index} className="flex flex-col">
                                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                        <img
                                            src={item.logo}
                                            alt={item.name}
                                            className="w-16 h-16 rounded-full object-contain"
                                        />
                                        <div className="flex-1">
                                            <h5 className="text-sm font-semibold">{item.name}</h5>
                                            <p className="text-lg font-bold text-green-600">Bonus: ₹{item.bonus}</p>
                                            <p className="text-sm text-gray-600">+ {item.freeSpins} Free Spins</p>
                                        </div>
                                        <button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white py-2 px-1 rounded text-xs whitespace-nowrap">
                                            {item.buttonText}
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1 px-1">
                                        18+ | Play Responsibly | gamblingtherapy.org | T&amp;Cs Apply
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;