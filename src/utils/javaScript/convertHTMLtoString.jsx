const convertHTMLtoString = (html, { length = 50, slice = true } = {}) => {
  if (!html) return "";

  // const htmlBody = "<p>gfdgfd</p><p>gjkdflgndf fngfgnf nfsdgjfngf fngjfdngfdgfd</p>";

  // Create a new DOMParser instance
  const parser = new DOMParser();

  // Parse the HTML string into a DOM Document
  const doc = parser.parseFromString(html, "text/html");

  // Extract the text content from the parsed document
  const textContent = doc.body.textContent;

  if (slice) {
    const sliceString = textContent.slice(0, length);
    return sliceString;
  }

  return textContent;
};

export default convertHTMLtoString;
