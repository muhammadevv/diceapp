const separator = window.location.pathname.replace(/\/+$/, '') + ':';

const setItem = localStorage.setItem.bind(localStorage);
localStorage.setItem = (key, value) => setItem(separator + key, value);

const getItem = localStorage.getItem.bind(localStorage);
localStorage.getItem = (key) => getItem(separator + key);

const removeItem = localStorage.removeItem.bind(localStorage);
localStorage.removeItem = (key) => removeItem(separator + key);

// module.exports = {}; // Exports an empty object
