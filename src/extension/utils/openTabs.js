const existingTabs = [];

export default function openTabs(urls) {
  while (existingTabs.length) {
    chrome.tabs.remove(existingTabs.pop().id);
  }

  urls.forEach(url => {
    chrome.tabs.create({
      url,
      active: false,
    }, tab => {
      existingTabs.push(tab);
    });
  });
}
