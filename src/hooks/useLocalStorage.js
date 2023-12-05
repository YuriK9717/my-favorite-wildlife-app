import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  // get stored value
  const storedValue = localStorage.getItem(key);
  // get initial value
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;
  // set initial value
  const [value, setValue] = useState(initial);

  // set new value
  const setStoredValue = (newValue) => {
    //for limitation to store 20 items only
    const entries = Object.entries(newValue);
    const last20Entries = entries.slice(-20);
  
    // Convert the array of key-value pairs back to an object
    const last20Animals = Object.fromEntries(last20Entries);

    setValue(last20Animals);
    localStorage.setItem(key, JSON.stringify(last20Animals));
  };
  const removeStoredValue = (key) => {
    localStorage.removeItem(key);
  };
  return [value, setStoredValue, removeStoredValue];
};

export default useLocalStorage;
