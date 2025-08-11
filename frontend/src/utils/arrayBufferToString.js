const arrayBufferToString = (bufferData) => {
  let binary = "";
  for (let i = 0; i < bufferData.length; i++) {
    binary += String.fromCharCode(bufferData[i]);
  }
  return binary;
};

export default arrayBufferToString;
