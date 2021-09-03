export default async function messageBackground(msg) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(msg, resp => {
      if (resp) {
        resolve(resp);
      } else {
        const lastErrMsg = chrome.runtime.lastError && chrome.runtime.lastError.message;
        reject(new Error(lastErrMsg || 'Something wrong with the Backgorund!'));
      }
    });
  });
}
