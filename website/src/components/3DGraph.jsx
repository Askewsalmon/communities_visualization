import { useRef } from "react";
import { ForceGraph3D } from "react-force-graph";
import PropTypes from "prop-types";

const ThreeDGraph = ({ graphData }) => {
  const graphRef = useRef();
  const graphHeight = window.innerHeight - 24;
  return (
    graphData && (
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        height={graphHeight}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.5}
        nodeColor={(node) => node.color}
        linkColor={(link) => link.source.color}
        linkWidth={4}
        nodeRelSize={6}
        enableNodeDrag={false}
        nodeOpacity={1}
        linkOpacity={0.6}
        cooldownTime={2000}
        onEngineStop={() => {
          graphRef.current.zoomToFit(1000);
        }}
      />
    )
  );
};

ThreeDGraph.propTypes = {
  graphData: PropTypes.object.isRequired,
};

export default ThreeDGraph;
