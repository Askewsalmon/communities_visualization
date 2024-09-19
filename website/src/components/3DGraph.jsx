import { useRef, useEffect, useCallback } from "react";
import { ForceGraph3D } from "react-force-graph";
import PropTypes from "prop-types";
import _ from "lodash";
import * as THREE from "three";
const ThreeDGraph = ({ graphData, highlightedNode }) => {
  const graphRef = useRef();

  const moveCameraPosition = useCallback(
    (node, distance) => {
      const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

      graphRef.current.cameraPosition(
        {
          x: node.x * distRatio,
          y: node.y * distRatio,
          z: node.z * distRatio,
        },
        node,
        6000
      );
    },
    [graphRef]
  );

  useEffect(() => {
    if (highlightedNode) {
      if (!_.isEmpty(highlightedNode)) {
        const node = _.find(graphData.nodes, { id: highlightedNode[0] });
        moveCameraPosition(node, 1000);
      } else {
        const node = graphData.nodes[0];
        moveCameraPosition(node, 1500);
      }
    }
  }, [highlightedNode]);
  return (
    graphData && (
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        d3AlphaDecay={0.01}
        d3VelocityDecay={0.5}
        backgroundColor="black"
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
        nodeThreeObject={(node) => {
          const obj = new THREE.Mesh(
            new THREE.SphereGeometry(5),
            new THREE.MeshBasicMaterial({ color: node.color || "blue" })
          );
          if (_.includes(highlightedNode, node.id)) {
            const outlineMaterial = new THREE.MeshBasicMaterial({
              color: "orange",
              transparent: true,
              opacity: 0.5,
              side: THREE.BackSide,
            });
            const outlineGeometry = new THREE.SphereGeometry(8, 32, 32);
            const outlineMesh = new THREE.Mesh(
              outlineGeometry,
              outlineMaterial
            );
            obj.add(outlineMesh);
          }
          return obj;
        }}
        linkWidth={4}
        nodeRelSize={6}
        enableNodeDrag={false}
        nodeOpacity={1}
        linkOpacity={0.6}
        cooldownTime={3000}
        onEngineStop={() => {
          if (!highlightedNode || _.isEmpty(highlightedNode)) {
            graphRef.current.zoomToFit(1000);
          }
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
