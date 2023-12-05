import { useState } from 'react';

const useEdges = () => {
  const [edges, setEdges] = useState([]);

  const addEdge = (newEdge) => {
    setEdges((prevEdges) => [...prevEdges, newEdge]);
  };

  const setStartPos = (id, pos) => {
    setEdges((prevEdges) =>
      prevEdges.map((edge) =>
        edge.id === id ? { ...edge, startPos: pos } : edge
      )
    );
  };

  const setEndPos = (id, pos) => {
    setEdges((prevEdges) =>
      prevEdges.map((edge) =>
        edge.id === id ? { ...edge, endPos: pos } : edge
      )
    );
  };


  return { edges, addEdge, setStartPos, setEndPos };
};

export default useEdges;
