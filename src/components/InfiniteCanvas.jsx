import { useState } from 'react';
import { Stage, Layer, Circle, Line } from 'react-konva';
import { v4 as uuidv4 } from 'uuid';
import useNodes from '../hooks/useNodes';
import useEdges from '../hooks/useEdges';
import useCtrlKey from '../hooks/useCtrlKey';
import {
  NODE_RADIUS,
  NODE_COLOR,
  EDGE_STROKE_COLOR,
  EDGE_STROKE_WIDTH,
} from '../constants/appConstants';

function InfiniteCanvas() {
  // local state
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });
  const [activeNodeID, setActiveNodeID] = useState(false);
  // hooked state
  const {
    nodes,
    addNode,
    highlightNode,
    resetNodeColor,
    grabNodePos,
    nodePlacementIsValid,
  } = useNodes();
  const { edges, addEdge } = useEdges();
  const ctrlIsPressed = useCtrlKey();

  const handleDragEnd = (e) => {
    setStagePos({
      x: e.target.x(),
      y: e.target.y(),
    });
    console.log('dragged to end');
  };

  const handleNodeClick = (e) => {
    e.cancelBubble = true;
    if (!ctrlIsPressed) {
      // make sure that ctrl IS pressed
      return;
    }

    const clickedNodeId = e.target.attrs.id;

    if (activeNodeID === false) {
      // we don't have an active node
      highlightNode(clickedNodeId);
      setActiveNodeID(clickedNodeId);
    } else {
      // we do have an active node
      resetNodeColor();
      const startNodePos = grabNodePos(activeNodeID);
      const endNodePos = grabNodePos(clickedNodeId);
      addEdge({
        // create edge
        id: uuidv4,
        startPos: startNodePos,
        endPos: endNodePos,
      });
      setActiveNodeID(false);
    }
  };

  const handleStageClick = (e) => {
    const stage = e.target.getStage();
    const pointerPosition = stage.getPointerPosition();
    const adjustedX = pointerPosition.x - stagePos.x;
    const adjustedY = pointerPosition.y - stagePos.y;

    console.log({ x: adjustedX, y: adjustedY });
    if (nodePlacementIsValid({ x: adjustedX, y: adjustedY })) {
      addNode({
        id: uuidv4(),
        x: adjustedX,
        y: adjustedY,
        color: NODE_COLOR,
      });
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      draggable
      onDragEnd={handleDragEnd}
      onClick={handleStageClick}
      x={stagePos.x}
      y={stagePos.y}
    >
      <Layer>
        {nodes.map((node) => (
          <Circle
            key={node.id}
            id={node.id}
            x={node.x}
            y={node.y}
            onClick={handleNodeClick}
            radius={NODE_RADIUS}
            fill={node.color}
          />
        ))}

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
      </Layer>
    </Stage>
  );
}
export default InfiniteCanvas;
