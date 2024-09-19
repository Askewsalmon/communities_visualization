import { useRef, useCallback } from "react";
import { ForceGraph3D } from "react-force-graph";
import PropTypes from "prop-types";
import _ from "lodash";
const ThreeDGraph = ({ graphData, highlightedNode }) => {
  const graphRef = useRef();
  const paintRing = useCallback(
    (node, ctx) => {
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.z, 9 * 1.4, 0, 2 * Math.PI, false);
      ctx.fillStyle = "orange";
      ctx.fill();
    },
    [highlightedNode]
  );
  return (
    graphData && (
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.5}
        backgroundColor="black"
        nodeColor={(node) => node.color}
        linkColor={(link) => {
          if (
            _.includes(highlightedNode, link.source.id) &&
            _.includes(highlightedNode, link.target.id)
          ) {
            return "orange";
          }
          if (link.source.color) {
            return link.source.color;
          } else {
            const source = _.find(graphData.nodes, { id: link.source });
            return source.color;
          }
        }}
        autoPauseRedraw={false}
        nodeCanvasObjectMode={(node) =>
          _.includes(highlightedNode, node.id) ? "before" : undefined
        }
        nodeCanvasObject={paintRing}
        linkWidth={4}
        nodeRelSize={6}
        enableNodeDrag={false}
        nodeOpacity={1}
        linkOpacity={0.6}
        cooldownTime={3000}
        onEngineStop={() => {
          graphRef.current.zoomToFit(1000);
        }}
      />
    )
  );
};

ThreeDGraph.propTypes = {
  graphData: PropTypes.object,
  highlightedNode: PropTypes.array,
};

export default ThreeDGraph;
