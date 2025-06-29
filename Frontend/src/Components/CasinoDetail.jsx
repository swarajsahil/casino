import React from "react";

const CasinoDetail = ({ data }) => {
  return (
    <div className="p-6 bg-gray-50 text-gray-800">
      {data.map((section, index) => (
        <div key={index} className="mb-6">
          {/* Render Heading */}
          {section.heading && (
            <h2
              id={section.id}
              className="text-2xl font-bold mb-4 text-black"
            >
              {section.heading}
            </h2>
          )}

          {/* Render Subheading */}
          {section.subheading && (
            <h3
              id={section.subheadingId}
              className="text-xl font-bold mb-4 text-black"
            >
              {section.subheading}
            </h3>
          )}

          {/* Render Paragraphs */}
          {section.paragraphs.map((paragraph, pIndex) => (
            <p key={pIndex} className="mb-4">
              {paragraph.split(/(\[.*?\]\(.*?\))/g).map((chunk, cIndex) => {
                const match = chunk.match(/\[(.*?)\]\((.*?)\)/) // Match markdown-style links
                if (match) {
                  return (
                    <a
                      key={cIndex}
                      href={match[2]}
                      className="text-black"
                    >
                      {match[1]}
                    </a>
                  );
                }
                return chunk;
              })}
            </p>
          ))}
        </div>
      ))}
    </div>
  );
};

export default CasinoDetail;