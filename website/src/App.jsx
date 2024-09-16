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

  useEffect(() => {
    setMode("community");
  }, []);
  useEffect(() => {
    if (mode === "cliques") {
      setCliques(FoodCliques.max_cliques);
      setGraphData({
        nodes: FoodCliques.graph_data.nodes,
        links: FoodCliques.graph_data.links,
      });
      setCommunities(undefined);
    } else if (mode === "community") {
      setCommunities(FoodCommunities.communities);
      setGraphData({
        nodes: FoodCommunities.graph.nodes,
        links: FoodCommunities.graph.edges,
      });
      setCliques(undefined);
    }
  }, [mode]);

  return (
    <Layout mode={mode} setMode={setMode}>
      <ThreeDGraph graphData={graphData} />
    </Layout>
  );
}

export default App;
