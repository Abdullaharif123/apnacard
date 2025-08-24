// Function to format card numbers
export const formatCardNumbers = (cardNumbers) => {
  if (!Array.isArray(cardNumbers) || cardNumbers.length === 0) {
    return ""; // Return empty string for invalid input
  }

  // Sort the numbers and ensure uniqueness
  const sortedNumbers = [...new Set(cardNumbers)].sort((a, b) => a - b);
  const result = [];
  let start = sortedNumbers[0];
  let end = start;

  for (let i = 1; i <= sortedNumbers.length; i++) {
    if (i < sortedNumbers.length && sortedNumbers[i] === end + 1) {
      // Continue the range
      end = sortedNumbers[i];
    } else {
      // End of the current range
      if (start === end) {
        result.push(start); // Single number
      } else {
        result.push(`${start} ... ${end}`); // Range
      }
      // Reset for the next range
      start = sortedNumbers[i];
      end = start;
    }
  }

  return result.join(", "); // Join with commas
};
