import React from 'react'

const LiveCasinoLoader = () => {
  return (
    <div className="flex flex-col w-full h-full bg-gray-100 justify-center items-center animate-pulse">
  {/* Title */}
  <div className="flex justify-start items-start w-3/4 mt-4">
    <div className="h-8 w-32 bg-gray-300 rounded"></div>
  </div>

  {/* Cards */}
  {[...Array(3)].map((_, index) => (
    <div
      key={index}
      className="flex flex-col w-5/6 h-auto bg-white gap-3 mt-4 mb-4 border-2 border-gray-100 rounded-lg p-4"
    >
      {/* Upper Section */}
      <div className="flex flex-col md:flex-row w-full h-auto md:h-44 gap-4">
        {/* Image and Info */}
        <div className="w-full md:w-1/3 flex flex-col md:flex-row justify-around items-center sm:gap-2">
          <div className="w-32 h-32 bg-gray-300 rounded-full"></div>
          <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-2/3">
            <div className="h-6 w-24 bg-gray-300 rounded"></div>
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Bonus */}
        <div className="flex flex-col w-full md:w-1/3 justify-center items-center md:pl-6 text-center md:text-left gap-2">
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
          <div className="h-4 w-28 bg-gray-300 rounded"></div>
          <div className="text-xs text-gray-400">
            <div className="h-4 w-48 bg-gray-300 rounded"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex w-full md:w-1/3 justify-center md:justify-end pr-2 items-center mt-4 md:mt-0">
          <div className="flex flex-col gap-4 pb-2">
            <div className="w-44 h-12 bg-gray-300 rounded-lg"></div>
            <div className="w-44 h-12 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Expandable Section */}
      <div className="flex flex-col md:flex-row w-full gap-4 mb-4">
        {/* About Section */}
        <div className="flex w-11/12 sm:w-full md:w-1/3 justify-center">
          <div className="flex flex-col h-auto border-2 border-gray-50 px-4 rounded-lg bg-gray-100 items-center justify-center w-full gap-2">
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
            <div className="h-4 w-40 bg-gray-300 rounded"></div>
          </div>
        </div>

        {/* Pros Section */}
        <div className="flex w-11/12 sm:w-full md:w-1/3 justify-center">
          <div className="flex flex-col h-auto border-2 border-gray-50 px-4 rounded-lg bg-gray-100 items-center justify-center w-full gap-2">
            <div className="h-6 w-16 bg-gray-300 rounded"></div>
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-4 w-full bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex w-11/12 sm:w-full md:w-1/3 justify-center">
          <div className="flex flex-col py-2 border-2 border-gray-50 px-4 rounded-lg bg-gray-100 items-center justify-center w-full gap-2">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="h-4 w-full bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ))}
</div>
  )
}

export default LiveCasinoLoader