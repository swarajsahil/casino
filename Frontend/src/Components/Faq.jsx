import React, { useState } from 'react';

const Faq = ({ data, title = "Frequently Asked Questions (FAQs)" }) => {
  const [openIndices, setOpenIndices] = useState([]);

  const toggleFAQ = (index) => {
    if (openIndices.includes(index)) {
      setOpenIndices(openIndices.filter((i) => i !== index)); // Close if already open
    } else {
      setOpenIndices([...openIndices, index]); // Open new one
    }
  };

  return (
    <div className="flex flex-col items-center px-4 mt-8 mb-2 w-full">
      <h2 className="text-brown-700 text-2xl font-bold mb-4 text-left">{title}</h2>
      <div className="space-y-4 w-full lg:w-3/5">
        {data.map((faq, index) => (
          <div
            key={index}
            className={`border overflow-hidden ${
              openIndices.includes(index) ? 'border-blue-500' : 'border-gray-300'
            } transition-all duration-300`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-4 text-left bg-white"
            >
              <span className="font-semibold ">{faq.question}</span>
              {openIndices.includes(index) ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className="w-6 h-6"
                >
                  <path
                    fill="#000"
                    d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm-6.5 10h13v1h-13v-1z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  className="w-6 h-6"
                >
                  <path
                    fill="#000"
                    d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z"
                  />
                </svg>
              )}
            </button>
            {openIndices.includes(index) && (
              <div className="p-4 text-gray-700 bg-blue-50">
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