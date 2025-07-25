// import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteSubscriber, fetchSubscribers } from "../common/subscriberSlice";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const Subscriber = () => {
  return (
    <div className="p-6">
      <SubscriberNavbar />
      <AdminSubscriber />
    </div>
  );
};

const SubscriberNavbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <Link to="/admin/subscribers" className="text-lg font-bold">All Subscribers</Link>
    </nav>
  );
};

const AdminSubscriber = () => {
  const dispatch = useDispatch();
//   const { allSubscribers, loading, error } = useSelector((state) => state.subscribers);

  const {subscribers,loading, error }= useSelector((state) => state.subscriber);
  useEffect(() => {
    dispatch(fetchSubscribers());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this subscriber?")) {
      dispatch(deleteSubscriber(id));
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Subscribed At</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subscribers?.map((subscriber, index) => (
              <tr key={subscriber._id || index} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{subscriber.email}</td>
                <td className="py-2 px-4 border-b">
                  {new Date(subscriber.createdAt).toLocaleString()}
                </td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => handleDelete(subscriber._id)} 
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={1.5} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" 
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Subscriber;