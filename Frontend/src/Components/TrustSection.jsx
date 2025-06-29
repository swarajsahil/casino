import React from 'react';

const TrustSection = ({ data }) => {
  return (
    <div className="sections w-full bg-[#f9d4b6] py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Heading */}
        <div className="text-left mx-auto mb-8 text-brown-600 lg:w-4/5 md:w-9/12">
          <h2 className="font-bold text-4xl mb-6">Why trust Casino?</h2>
          <p className="text-lg leading-relaxed">
            We ensure our readers get timely and accurate information about the best online casinos in India. Additionally, we take it upon ourselves to separate the bad eggs from the good ones so that our players can make the best pick.
          </p>
        </div>

        {/* Dynamic Cards */}
        <div className="flex flex-wrap -mx-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex-shrink px-4 w-full md:w-1/2 lg:w-1/3 lg:px-6 mb-6 flex flex-col"
            >
              <div className="transform transition duration-300 ease-in-out hover:-translate-y-2 bg-white p-6 rounded-lg shadow-lg flex-grow">
                <div className="text-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="mx-auto mb-4 h-20 object-contain"
                  />
                  <span className="block font-semibold text-lg">
                    {item.title}
                  </span>
                  <p className="mt-2 text-gray-700">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSection;