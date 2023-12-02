import { useState, useEffect } from 'react';

const useCtrlKey = () => {
  const [ctrlIsPressed, setCtrlIsPressed] = useState(false);

  useEffect(() => {
    const downHandler = (e) => setCtrlIsPressed(e.ctrlKey);
    const upHandler = () => setCtrlIsPressed(false);

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);

  return ctrlIsPressed;
};

export default useCtrlKey;
