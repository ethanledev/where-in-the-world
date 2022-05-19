export const formatPopulation = (num) => {
  const array = num.toString().split("");
  const numDigits = array.length;
  const numCommas = Math.floor(numDigits / 3);
  for (let i = 1; i <= numCommas; i++) {
    const index = numDigits - i * 3;
    if (index !== 0) {
      array.splice(index, 0, ",");
    }
  }
  const populationStr = array.join("");
  return populationStr;
};
