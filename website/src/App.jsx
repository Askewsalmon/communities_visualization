import Layout from "./layout/Layout";
import FoodCliques from "../public/graph_data/fb-food/graph_data_cliques.json";
import FoodCommunities from "../public/graph_data/fb-food/graph_data_communities.json";
import { useEffect, useState, useRef } from "react";
import { ForceGraph3D } from "react-force-graph";
import _, { set } from "lodash";

function App() {
  const [graphData, setGraphData] = useState({
    nodes: FoodCliques.graph_data.nodes,
    links: FoodCliques.graph_data.links,
  });
  const [mode, setMode] = useState("cliques");
  const [cliques, setCliques] = useState(undefined);
  const [commmunities, setCommunities] = useState(undefined);
  const graphRef = useRef();
  const [nodeColors, setNodeColors] = useState(null);

  const graphHeight = window.innerHeight - 24;

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const createColorsDictionary = () => {
    const colors = {};
    _.forEach(cliques, (clique) => {
      const color = getRandomColor();
      _.forEach(clique, (nodeIndex) => {
        if (!colors[nodeIndex]) {
          colors[nodeIndex] = color;
        }
      });
    });
    return colors;
  };

  useEffect(() => {
    if (mode === "cliques") {
      setCliques(FoodCliques.max_cliques);
    } else {
      setCommunities(FoodCommunities.communities);
    }
  }, [mode]);

  useEffect(() => {
    if (cliques) {
      const colors = createColorsDictionary(cliques);
      setNodeColors(colors);
    }
  }, [cliques]);

  return (
    <Layout>
      {nodeColors && (
        <ForceGraph3D
          ref={graphRef}
          graphData={graphData}
          height={graphHeight}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.7}
          nodeAutoColorBy={(node) => nodeColors[node.id]}
          linkAutoColorBy={(link) => nodeColors[link.source]}
          linkWidth={4}
          nodeRelSize={6}
          enableNodeDrag={false}
          nodeOpacity={1}
          linkOpacity={0.6}
          controlType="orbit"
        />
      )}
    </Layout>
  );
}

export default App;
