import { useState, useEffect } from 'react';
import { Stage, Layer, Circle, Line } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';
import useNodes from '../hooks/useNodes';
import useEdges from '../hooks/useEdges';
import useCtrlKey from '../hooks/useCtrlKey';
import useShiftKey from '../hooks/useShiftKey';
import {
  NODE_RADIUS,
  NODE_COLOR,
  EDGE_STROKE_COLOR,
  EDGE_STROKE_WIDTH,
} from '../constants/appConstants';

function InfiniteCanvas() {
  // local state
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [activeNodeId, setActiveNodeId] = useState(false);
  // hooked state
  const {
    nodes,
    addNode,
    highlightNode,
    getNodePos,
    setNodePos,
    createConnection,
    getConnection,
    nodePlacementIsValid,
    grabNode, // ONLY USE FOR TESTING
  } = useNodes();
  const { edges, addEdge, setStartPos, setEndPos } = useEdges();
  const ctrlIsPressed = useCtrlKey();
  const shiftIsPressed = useShiftKey();

  const handleStageDragEnd = (e) => {
    setStagePos({
      x: e.target.x(),
      y: e.target.y(),
    });
    console.log('dragging stage');
  };

  const handleNodeDragMove = (e) => {
    e.cancelBubble = true;
    const draggedNodeId = e.target.attrs.id;
    const connections = getConnection(draggedNodeId);
    const nodePos = getNodePos(draggedNodeId);

    connections.forEach((connection) => {
      // for each connection we check wether the node connects to the start or the end of the edge
      const edgeId = connection.edgeId;
      if (connection.whatIsNode === 'start') {
        setStartPos(edgeId, nodePos);
      } else {
        setEndPos(edgeId, nodePos);
      }
    });
    setNodePos(draggedNodeId, { x: e.target.attrs.x, y: e.target.attrs.y });
  };

  const handleNodeDragEnd = (e) => {
    e.cancelBubble = true;
  };

  const handleNodeClick = (e) => {
    e.cancelBubble = true;
    if (!ctrlIsPressed) {
      // make sure that ctrl IS pressed
      return;
    }

    const clickedNodeId = e.target.attrs.id;

    if (activeNodeId === false) {
      // we don't have an active node
      highlightNode(clickedNodeId);
      setActiveNodeId(clickedNodeId);
    } else {
      // we do have an active node
      const startNodePos = getNodePos(activeNodeId);
      const endNodePos = getNodePos(clickedNodeId);
      const edgeId = uuidv4();
      addEdge({
        // create edge
        id: edgeId,
        startPos: startNodePos,
        endPos: endNodePos,
      });
      setActiveNodeId(false);
      createConnection(activeNodeId, clickedNodeId, edgeId);
    }

    if (activeNodeId === clickedNodeId) {
      setActiveNodeId(false);
      return;
    }
  };

  const handleStageClick = (e) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const adjustedX = pointerPosition.x - stagePos.x;
    const adjustedY = pointerPosition.y - stagePos.y;

    if (nodePlacementIsValid({ x: adjustedX, y: adjustedY })) {
      addNode({
        id: uuidv4(),
        x: adjustedX,
        y: adjustedY,
        color: NODE_COLOR,
        connections: [],
      });
    }
  };

  useEffect(() => {
    //console.log(nodes);
  }, [nodes]);

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable={!shiftIsPressed}
      onDragEnd={handleStageDragEnd}
      onClick={handleStageClick}
      x={stagePos.x}
      y={stagePos.y}
    >
      <Layer>
        {edges.map((edge) => (
          <Line
            key={edge.id}
            id={edge.id}
            points={[
              edge.startPos.x,
              edge.startPos.y,
              edge.endPos.x,
              edge.endPos.y,
            ]}
            stroke={EDGE_STROKE_COLOR}
            strokeWidth={EDGE_STROKE_WIDTH}
          />
        ))}

        {nodes.map((node) => (
          <Circle
            key={node.id}
            id={node.id}
            x={node.x}
            y={node.y}
            draggable={!ctrlIsPressed}
            onClick={handleNodeClick}
            onDragMove={handleNodeDragMove}
            onDragEnd={handleNodeDragEnd}
            radius={NODE_RADIUS}
            fill={node.color}
          />
        ))}
      </Layer>
    </Stage>
  );
}
export default InfiniteCanvas;
