import { useState, useEffect } from 'react';

const useShiftKey = () => {
  const [shiftIsPressed, setShiftIsPressed] = useState(false);

  useEffect(() => {
    const downHandler = (e) => setShiftIsPressed(e.shiftKey);
    const upHandler = () => setShiftIsPressed(false);

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return shiftIsPressed;
};

export default useShiftKey;
