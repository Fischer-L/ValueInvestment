export default function localVarsOf(key, defaultVars = {}) {
  if (!window.giContentScript) {
    window.giContentScript = {};
  }
  const localVars = window.giContentScript[key] || defaultVars;
  window.giContentScript[key] = localVars;
  return localVars;
}
