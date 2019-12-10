export default function openLink(...urls) {
  requestIdleCallback(() => {
    for (let i = urls.length - 1; i >= 0; --i) {
      window.open(urls[i], urls[i], 'noopener,noreferrer');
    }
  });
}
