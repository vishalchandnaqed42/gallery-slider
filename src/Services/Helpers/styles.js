const deriveCSSNumber = (value) => {
  if (isNaN(value))
    return value;
  else
    return `${value}px`;
};

window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};
const mobileMatchMedia = window.matchMedia("(max-width: 500px)");

export { deriveCSSNumber, mobileMatchMedia };