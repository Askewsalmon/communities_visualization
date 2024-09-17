import Layout from "./layout/Layout";
import FoodCliques from "../public/graph_data/fb-food/graph_data_cliques.json";
import FoodCommunities from "../public/graph_data/fb-food/graph_data_communities.json";
import { useEffect, useState } from "react";
import ThreeDGraph from "./components/3DGraph";
import _ from "lodash";

function App() {
  const [graphData, setGraphData] = useState(undefined);
  const [mode, setMode] = useState(undefined);
  const [cliques, setCliques] = useState(undefined);
  const [communities, setCommunities] = useState(undefined);
  const [nodeColors, setNodeColors] = useState([]);

  const generateColor = (existingColors) => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    if (existingColors.includes(color)) {
      return generateColor(existingColors);
    }
    return color;
  };

  useEffect(() => {
    setMode("cliques");
  }, []);
  useEffect(() => {
    if (mode === "cliques") {
      setNodeColors([]);
      setCommunities(undefined);
      let colors = [];
      setCliques(FoodCliques.max_cliques);
      setGraphData({
        nodes: FoodCliques.graph_data.nodes,
        links: FoodCliques.graph_data.links,
      });
      _.forEach(FoodCliques.max_cliques, (clique) => {
        colors.push({ element: clique.name, color: generateColor(colors) });
      });
      setNodeColors(colors);
    } else if (mode === "community") {
      setNodeColors([]);
      setCliques(undefined);
      let colors = [];
      setCommunities(FoodCommunities.communities);
      setGraphData({
        nodes: FoodCommunities.graph.nodes,
        links: FoodCommunities.graph.edges,
      });
      _.forEach(FoodCommunities.communities, (community) => {
        colors.push({ element: community.name, color: generateColor(colors) });
      });
      setNodeColors(colors);
    }
  }, [mode]);

  useEffect(() => {
    if (!_.isEmpty(nodeColors) && graphData) {
      _.forEach(graphData.nodes, (node) => {
        const color = _.find(nodeColors, (element) => {
          return element.element === `cliques ${node.community_name}`;
        });
        node.color = color.color;
      });
    }
  }, [nodeColors]);

  return (
    <Layout mode={mode} setMode={setMode}>
      <ThreeDGraph graphData={graphData} />
    </Layout>
  );
}

export default App;
