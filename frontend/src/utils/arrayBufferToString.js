export const arrayBufferToString = (bufferData) => {
  let binary = "";
  for (let i = 0; i < bufferData.length; i++) {
    binary += String.fromCharCode(bufferData[i]);
  }
  return binary;
};
export const bufferToBase64 = (buffer) => {
  if (buffer?.data) {
    return buffer.data.map((code) => String.fromCharCode(code)).join("");
  }
  return null;
};
