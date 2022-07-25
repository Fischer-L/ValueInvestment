export default function localVarsOf(key, defaultVars = {}) {
  if (!window._valueInvestmentContentScript) {
    window._valueInvestmentContentScript = {};
  }
  const localVars = window._valueInvestmentContentScript[key] || defaultVars;
  window._valueInvestmentContentScript[key] = localVars;
  return localVars;
}
