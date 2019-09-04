import {useState,useEffect} from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue];

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      setDebouncedValue(value);
    }, delay)
    return () => clearTimeout(timeoutRef)
  })
  return debouncedValue
}

export default useDebounce;