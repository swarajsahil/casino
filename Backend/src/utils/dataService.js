// Function to split sentences and enforce word limits
export const processData = (input, wordLimit) => {
    if (!input || typeof input !== 'string') return [];
  
    return input
      .split('.')  // Split by full stops
      .map((sentence) => sentence.trim())  // Trim spaces
      .filter((sentence) => sentence)  // Remove empty sentences
      .map((sentence) => {
        const words = sentence.split(/\s+/);  // Split into words
        return words.slice(0, wordLimit).join(' ');  // Truncate to word limit
      });
  };