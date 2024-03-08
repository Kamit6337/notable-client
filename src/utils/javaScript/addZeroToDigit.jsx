const addZeroToDigit = (num) => {
  const convertToStr = num.toString();

  if (convertToStr.length !== 1) return convertToStr;

  return `0${convertToStr}`;
};

export default addZeroToDigit;
