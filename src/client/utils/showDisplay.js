const showDisplay = (_show, otherStyles) => ({ ...otherStyles, display: _show ? '' : 'none' });

export const show = showDisplay;

// Leave this because of the backward compatibility
export default showDisplay;
