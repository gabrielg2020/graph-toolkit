import { useState } from 'react';
import { NODE_COLOR, NODE_HIGHLIGHT_COLOR } from '../constants/appConstants';

const useNodes = () => {
  const [nodes, setNodes] = useState([]);

  const addNode = (newNode) => {
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const highlightNode = (clickedNode) => {
    setNodes(
      nodes.map((node) =>
        node.id === clickedNode.id
          ? { ...node, color: NODE_HIGHLIGHT_COLOR }
          : node
      )
    );
  }

  const resetNodeColor = () => {
    setNodes(
      nodes.map((node) =>
        node.color === NODE_HIGHLIGHT_COLOR
          ? { ...node, color: NODE_COLOR }
          : node
      )
    );
  }

  return { nodes, addNode, highlightNode, resetNodeColor };
};

export default useNodes
