import React, { useState, useEffect } from "react";
import debounce from "lodash/debounce";
import { useDispatch, useSelector } from "react-redux";
import { fetchCasinos } from "../common/casinoSlice";

const Reviews = () => {
  const API_URL=import.meta.env.VITE_API_URL;
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const detectTagType = (tagText) => {
    const negativeKeywords = ["scam", "fraud", "rude", "not pay", "bad"];
    const positiveKeywords = ["excellent", "great", "friendly", "fast", "good"];
    const lowercaseTag = tagText.toLowerCase();
    return negativeKeywords.some((word) => lowercaseTag.includes(word))
      ? "negative"
      : positiveKeywords.some((word) => lowercaseTag.includes(word))
      ? "positive"
      : "neutral";
  };

  const formatTimestamp = () => {
    const now = new Date();
    return `${now.toLocaleDateString()} ${now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  const handleSearch = debounce((query) => {
    const filtered = reviews.filter((review) =>
      review.review.casino.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredReviews(filtered);
  }, 300);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/reviews`);
        const data = await response.json();
        setReviews(data);
        setFilteredReviews(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  useEffect(() => {
    handleSearch(searchQuery);
  }, [searchQuery, reviews]);

  const toggleModal = () => setModalOpen((prev) => !prev);

  const handleAddReview = async (newReview) => {
    try {
      const response = await fetch(`${API_URL}/api/newReviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newReview),
      });

      await response.json();
      toggleModal();
      setShowSuccessPopup(true);
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  };

  const SuccessPopup = () => {
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md text-center animate-fade-in">
          <div className="mb-4">
            <svg
              className="w-16 h-16 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            Review Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Thank you for your review. It will be visible after admin approval.
          </p>
          <button
            onClick={() => setShowSuccessPopup(false)}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const ReviewCard = ({ review, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const wordCount = review.review.content.split(" ").length;

    const handleToggle = () => setIsExpanded(!isExpanded);

    const formatTimestamp = (timestamp) => {
      const now = new Date();
      const reviewTime = new Date(timestamp);
      const diffInMs = now - reviewTime;

      const seconds = Math.floor(diffInMs / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (years > 0) return `${years}y`;
      if (months > 0) return `${months}mo`;
      if (days > 0) return `${days}d`;
      if (hours > 0) return `${hours}h`;
      if (minutes > 0) return `${minutes}m`;
      return "Just now";
    };

    const stringToColor = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const color = `hsl(${hash % 360}, 70%, 50%)`; // Vibrant HSL color
      return color;
    };

    return (
      <div className="bg-white flex flex-col w-4/5 shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mb-6 overflow-hidden">
        <div className="flex w-full">
          <div className="flex flex-col w-40 border-r border-gray-200 justify-start items-center pt-4 bg-gray-50">
            <div className="relative group">
              <div
                className="w-28 h-28 flex items-center justify-center rounded-full text-white text-4xl font-bold border-4 transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundColor: stringToColor(review.user.username || "User"),
                }}
              >
                {(review.user.username || "U")[0].toUpperCase()}
              </div>
              <div className="absolute inset-0 bg-purple-500 opacity-0 group-hover:opacity-20 rounded-full transition-opacity duration-300" />
            </div>
            <div className="text-sm text-gray-600 mt-2 font-medium">
              {review.user.username}
            </div>
            <div className="text-xs text-gray-400 mt-1">
              {review.user.reviewsCount || 'New Member'}
            </div>
          </div>

          <div className="flex-1 p-4">
            <h5 className="text-lg font-bold mb-2 text-gray-800">
              {review.review.casino}
              <span className="ml-2 text-purple-600 text-sm font-normal">
                #{index + 1}
              </span>
            </h5>
            <div className="flex flex-col space-x-2 gap-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`w-8 h-2 transition-all duration-200 ${
                      i < review.review.rating ? "bg-yellow-400" : "bg-gray-200"
                    } rounded-full`}
                  />
                ))}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse" />
                <span className="font-medium text-gray-600">
                  {formatTimestamp(review.review.timestamp)}
                </span>
              </div>
              <div className="my-3 w-11/12">
                <hr className="border-t-2 border-gray-200" />
              </div>
            </div>

            <div className="flex flex-col gap-3 mt-2">
              <p className="text-gray-700 leading-relaxed transition-all duration-300">
                {isExpanded
                  ? review.review.content
                  : `${review.review.content.slice(0, 100)}...`}
                {!isExpanded && wordCount > 25 && (
                  <span className="text-gray-400 ml-1">[+]</span>
                )}
              </p>
              {wordCount >= 25 && (
                <button
                  onClick={handleToggle}
                  className="w-36 text-sm font-bold flex items-center px-2 py-1 text-purple-600 hover:text-purple-800 transition-colors duration-200 group"
                >
                  {isExpanded ? (
                    <>
                      Show Less
                      <svg className="ml-2 w-4 h-4 transform group-hover:-translate-y-0.5 transition-transform" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      Show More
                      <svg className="ml-2 w-4 h-4 transform group-hover:translate-y-0.5 transition-transform" 
                        fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="mt-4">
              <div className="flex flex-wrap gap-2 mt-2">
                {review.review.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 text-sm font-medium rounded-full flex items-center ${
                      tag.type === "negative"
                        ? "bg-red-100 text-red-800 hover:bg-red-200"
                        : tag.type === "positive"
                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                        : "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    } transition-colors duration-200`}
                  >
                    {tag.type === 'positive' && (
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {tag.type === 'negative' && (
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    )}
                    {tag.text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AddReviewModal = ({ onClose, onAddReview }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      username: "",
      content: "",
      casino: "",
      rating: 0,
      tags: "",
    });
    const [error, setError] = useState("");
    const { data: casinos } = useSelector((state) => state.casinos);
    useEffect(() => {
      dispatch(fetchCasinos());
    }, [dispatch]);


    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setError("");
      setFormData({ ...formData, [name]: value });
    };

    const handleContentChange = (e) => {
      const { value } = e.target;
      setFormData((prev) => {
        const updatedData = { ...prev, content: value };
        const wordCount = updatedData.content.trim().split(/\s+/).length;
        if (wordCount > 100) setError("Review content must not exceed 100 words.");
        else setError("");
        return updatedData;
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const wordCount = formData.content.trim().split(/\s+/).length;
      if (wordCount > 100) return;

      const newReview = {
        user: {
          initials: formData.username[0]?.toUpperCase() || "U",
          username: formData.username,
        },
        review: {
          content: formData.content,
          casino: formData.casino,
          rating: formData.rating,
          timestamp: formatTimestamp(),
          tags: formData.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
            .map((tag) => ({
              text: tag,
              type: detectTagType(tag),
            })),
        },
      };

      try {
        await onAddReview(newReview);
      } catch (error) {
        console.error("Submission failed:", error);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Write a Review</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Your Name"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div>
              <textarea
                name="content"
                placeholder="Write your review here (max 100 words)..."
                value={formData.content}
                onChange={handleContentChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                rows="4"
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Casino Name
              </label>
              <select
                name="casino"
                value={formData.casino}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                required
              >
                <option value="">Select a Casino</option>
                {casinos.map((casino) => (
                  <option key={casino._id} value={casino.name}>
                    {casino.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setFormData({ ...formData, rating: i + 1 })}
                    className={`cursor-pointer text-3xl transition-transform duration-200 hover:scale-125 ${
                      i < formData.rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>

            <div>
              <input
                type="text"
                name="tags"
                placeholder="Tags (comma-separated)"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen py-8">
      <div className="flex justify-center mb-12">
        <div className="w-3/4 bg-white rounded-2xl shadow-md p-8 transition-all duration-300 hover:shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
  {/* Icon + Heading */}
  <div className="flex items-center text-center sm:text-left">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 w-10 sm:h-12 sm:w-12 text-purple-600 flex-shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118L2.077 10.1c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
    <h1 className="text-lg sm:text-2xl font-bold text-gray-800 ml-3">
      Browse all user reviews of online casinos
    </h1>
  </div>

  {/* Button */}
  <div className="w-full sm:w-auto flex justify-center sm:justify-end">
    <button
      onClick={toggleModal}
      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-md text-sm sm:text-base"
    >
      Write a Review
    </button>
  </div>
</div>

          <div className="mb-8">
            <hr className="border-t-2 border-gray-200" />
          </div>

          <div className="relative">
            <input
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              type="text"
              placeholder="Search for casinos..."
            />
            <svg
              className="w-6 h-6 absolute left-4 top-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review, index) => (
            <ReviewCard key={review._id || index} review={review} index={index} />
          ))
        ) : (
          <div className="bg-white p-8 rounded-2xl shadow-md w-3/4 text-center">
            <p className="text-gray-500 text-xl">No casinos found matching your search</p>
          </div>
        )}
      </div>

      {isModalOpen && <AddReviewModal onClose={toggleModal} onAddReview={handleAddReview} />}
      {showSuccessPopup && <SuccessPopup />}
    </div>
  );
};

export default Reviews;