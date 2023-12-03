import { useState } from 'react';

const useNodes = () => {
  const [nodes, setNodes] = useState([]);

  const addNode = (newNode) => {
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const highlightNode = (clickedNode) => {
    setNodes(
      nodes.map((node) =>
        node.id === clickedNode.id ? { ...node, color: 'blue' } : node
      )
    );
  }

  const resetNodeColor = () => {
    setNodes(
      nodes.map((node) =>
        node.color === 'blue' ? { ...node, color: 'red' } : node
      )
    );
  }

  return { nodes, addNode, highlightNode, resetNodeColor };
};

export default useNodes
