const countVowels = (word) => {
  const vowels = ["a", "e", "i", "o", "u"];
  const lowerCaseWord = word.toLowerCase();
  return [...lowerCaseWord].filter((char) => vowels.includes(char)).length;
};
