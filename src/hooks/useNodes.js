import { useState } from 'react';
import {
  NODE_COLOR,
  NODE_HIGHLIGHT_COLOR,
  NODE_RADIUS,
} from '../constants/appConstants';

const useNodes = () => {
  const [nodes, setNodes] = useState([]);

  const addNode = (newNode) => {
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const highlightNode = (id) => {
    setNodes(
      nodes.map((node) =>
        node.id === id ? { ...node, color: NODE_HIGHLIGHT_COLOR } : node
      )
    );
  };

  const grabNodePos = (id) => {
    const node = nodes.find((node) => node.id === id);
    if (node) {
      return { x: node.x, y: node.y };
    }
  };

  const createConnection = (startID, endID, edgeID) => {
    setNodes(
      nodes.map((node) => {
        if (node.id === startID) {
          return {
            ...node,
            color: NODE_COLOR, // reset the color of the startID
            connections: [
              ...node.connections,
              { endID: endID, edgeID: edgeID },
            ], // add connection to the start node
          };
        } else if (node.id === endID) {
          return {
            ...node,
            connections: [
              ...node.connections,
              { endID: startID, edgeID: edgeID },
            ],
          }; // add connection to the end node
        }
        return node;
      })
    );
  };

  const nodePlacementIsValid = (point) => {
    if (nodes.length === 0) {
      return true;
    }

    const x = point.x;
    const y = point.y;

    return nodes.every((node) => {
      const distanceFromNode = Math.sqrt(
        Math.pow(x - node.x, 2) + Math.pow(y - node.y, 2)
      );

      return distanceFromNode > 2 * NODE_RADIUS;
    });
  };

  // ONLY USE FOR TESTING
  const grabNode = (id) => {
    return nodes.find((node) => {
      return node.id === id;
    });
  };

  return {
    nodes,
    addNode,
    highlightNode,
    grabNodePos,
    createConnection,
    nodePlacementIsValid,
    grabNode,
  };
};

export default useNodes;
