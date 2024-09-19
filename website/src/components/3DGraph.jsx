import { useRef } from "react";
import { ForceGraph3D } from "react-force-graph";
import PropTypes from "prop-types";
import _ from "lodash";
const ThreeDGraph = ({ graphData }) => {
  const graphRef = useRef();
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
          if (link.source.color) {
            return link.source.color;
          } else {
            const source = _.find(graphData.nodes, { id: link.source });
            return source.color;
          }
        }}
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
  graphData: PropTypes.object.isRequired,
};

export default ThreeDGraph;
