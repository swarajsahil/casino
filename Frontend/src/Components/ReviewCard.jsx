import { useState } from "react";
import { formatTimestamp } from "../app/constants";
export const DesktopReviewCard = ({ review, index }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const wordCount = review.review.content.split(" ").length;

    const stringToColor = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      return `hsl(${hash % 360}, 70%, 50%)`;
    };

    return (
      <div className="bg-white flex flex-col w-full shadow-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 mb-6 overflow-hidden">
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
                  onClick={() => setIsExpanded(!isExpanded)}
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

  export const MobileReviewCard = ({ review, index }) => {
      const [isExpanded, setIsExpanded] = useState(false);
      const wordCount = review.review.content.split(" ").length;
  
      const stringToColor = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return `hsl(${hash % 360}, 70%, 50%)`;
      };
  
      return (
        <div className="bg-white rounded-xl shadow-md p-4 mb-4 w-full">
          {/* Header with user info */}
          <div className="flex items-center mb-3">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-3"
              style={{ backgroundColor: stringToColor(review.user.username || "User") }}
            >
              {(review.user.username || "U")[0].toUpperCase()}
            </div>
            <div>
              <h4 className="font-bold text-gray-800">{review.user.username}</h4>
              <p className="text-xs text-gray-500">
                {review.user.reviewsCount || 'New Member'}
              </p>
            </div>
          </div>
  
          {/* Casino name and rating */}
          <div className="mb-2">
            <h3 className="font-bold text-lg text-gray-800">
              {review.review.casino}
            </h3>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`text-xl ${i < review.review.rating ? "text-yellow-400" : "text-gray-300"}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
  
          {/* Review content with expand/collapse */}
          <div className="mb-3">
            <p className={`text-gray-700 ${!isExpanded ? 'line-clamp-3' : ''}`}>
              {review.review.content}
            </p>
            {wordCount > 25 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-purple-600 text-sm font-medium mt-1 flex items-center"
              >
                {isExpanded ? 'Show less' : 'Read more'}
                <svg
                  className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}
          </div>
  
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-2">
            {review.review.tags.map((tag, idx) => (
              <span
                key={idx}
                className={`px-2 py-1 text-xs rounded-full ${
                  tag.type === "negative"
                    ? "bg-red-100 text-red-800"
                    : tag.type === "positive"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {tag.text}
              </span>
            ))}
          </div>
  
          {/* Footer with timestamp */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
            <span className="text-xs text-gray-500">
              {formatTimestamp(review.review.timestamp)}
            </span>
            <span className="text-xs text-gray-400">
              #{index + 1}
            </span>
          </div>
        </div>
      );
    };