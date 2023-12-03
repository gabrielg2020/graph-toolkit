import { useState } from 'react';
import { NODE_COLOR, NODE_HIGHLIGHT_COLOR, NODE_RADIUS } from '../constants/appConstants';

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
  };

  const resetNodeColor = () => {
    setNodes(
      nodes.map((node) =>
        node.color === NODE_HIGHLIGHT_COLOR
          ? { ...node, color: NODE_COLOR }
          : node
      )
    );
  };

  const isPointInANode = (point) => {
    const x = point.x;
    const y = point.y;

    return nodes.find((node) => {
      const distanceFromNode = Math.sqrt(
        Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2)
      );

      return distanceFromNode <= NODE_RADIUS;
    });
  };

  const nodePlacementIsValid = (point) => {
    if (nodes.length === 0) {
      return true
    }

    const x = point.x;
    const y = point.y;

    return nodes.every((node) =>{
      const distanceFromNode = Math.sqrt(
        Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2)
      );

      return distanceFromNode > 2*NODE_RADIUS
    })
  }

  return {
    nodes,
    addNode,
    highlightNode,
    resetNodeColor,
    isPointInANode,
    nodePlacementIsValid,
  };
};

export default useNodes;
