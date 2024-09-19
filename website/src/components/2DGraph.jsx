import { ForceGraph2D } from "react-force-graph";
import PropTypes from "prop-types";
import { useRef, useCallback } from "react";
import _ from "lodash";

const TwoDGraph = ({ graphData, highlightedNode }) => {
  const graphRef = useRef();
  const paintRing = useCallback(
    (node, ctx) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, 9 * 1.4, 0, 2 * Math.PI, false);
      ctx.fillStyle = "orange";
      ctx.fill();
    },
    [highlightedNode]
  );
  return (
    graphData && (
      <ForceGraph2D
        ref={graphRef}
        graphData={graphData}
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.4}
        backgroundColor="black"
        nodeColor={(node) => node.color}
        linkColor={(link) => {
          let color;
          if (link.source.color) {
            color = link.source.color;
          } else {
            const source = _.find(graphData.nodes, { id: link.source });
            color = source.color;
          }
          if (color) {
            const hexToRgba = (hex, opacity) => {
              const bigint = parseInt(hex.slice(1), 16);
              const r = (bigint >> 16) & 255;
              const g = (bigint >> 8) & 255;
              const b = bigint & 255;
              return `rgba(${r}, ${g}, ${b}, ${opacity})`;
            };
            if (
              _.includes(highlightedNode, link.source.id) &&
              _.includes(highlightedNode, link.target.id)
            ) {
              return "orange";
            }
            return hexToRgba(color, 0.5);
          }
        }}
        nodeRelSize={10}
        linkWidth={2}
        nodeOpacity={1}
        autoPauseRedraw={false}
        nodeCanvasObjectMode={(node) =>
          _.includes(highlightedNode, node.id) ? "before" : undefined
        }
        nodeCanvasObject={paintRing}
        enableNodeDrag={false}
        cooldownTime={3000}
        onEngineStop={() => {
          graphRef.current.zoomToFit(1000);
        }}
      />
    )
  );
};

TwoDGraph.propTypes = {
  graphData: PropTypes.object,
  highlightedNode: PropTypes.array,
};

export default TwoDGraph;
