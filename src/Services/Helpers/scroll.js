const scrollTo = (el) => {
  if (el && el.scrollTo)
    return el.scrollTo.bind(el);
  else
    return ({ left }) => {
      // A small hardcoded polyfill to scroll horizontally.
      el.scrollLeft = left;
    }
};

export default scrollTo;