export default function openURL(...urls) {
  requestAnimationFrame(() => {
    for (let i = 0; i < urls.length; ++i) {
      window.open(urls[i], urls[i], 'noopener,noreferrer');
    }
  });
}
