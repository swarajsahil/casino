import React, {  useState } from 'react';

const Faq = ({ data, title = "Frequently Asked Questions (FAQs)" }) => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleFAQ = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index));
    } else {
      setOpenIndices([...openIndices, index]);
    }
  };

  return (
    <div className="w-full px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800 sm:text-3xl md:text-left">
        {title}
      </h2>
      
      <div className="space-y-4 w-full md:w-4/5 lg:w-3/5 mx-auto">
        {data?.map((faq, index) => (
          <div
            key={index}
            className={`border rounded-lg overflow-hidden transition-all duration-300 ${
              openIndices.includes(index) 
                ? 'border-blue-500 shadow-md' 
                : 'border-gray-200'
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              aria-expanded={openIndices.includes(index)}
              aria-controls={`faq-content-${index}`}
            >
              <span className="text-sm font-medium text-gray-900 sm:text-base md:text-lg">
                {faq.question}
              </span>
              <span className="ml-4 flex-shrink-0">
                {openIndices.includes(index) ? (
                  <svg
                    className="w-5 h-5 text-gray-700 sm:w-6 sm:h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-700 sm:w-6 sm:h-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </button>

            {openIndices.includes(index) && (
              <div
                id={`faq-content-${index}`}
                className="p-4 text-sm text-gray-600 bg-gray-50 sm:text-base"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;