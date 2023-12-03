import { useState } from 'react';

const useEdges = () => {
  const [edges, setEdges] = useState([]);

  const addEdge = (newEdge) => {
    setEdges((prevEdges) => [...prevEdges, newEdge]);
  };

  return { edges, addEdge };
};

export default useEdges;
