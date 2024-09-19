import Layout from "./layout/Layout";
import FoodCliques from "../public/graph_data/fb-food/graph_data_food_cliques.json";
import FoodCommunities from "../public/graph_data/fb-food/graph_data_food_communities.json";
import TvShowCliques from "../public/graph_data/fb-tvshow/graph_data_tvshow_cliques.json";
import TvShowCommunities from "../public/graph_data/fb-tvshow/graph_data_tvshow_communities.json";
import { useEffect, useState } from "react";
import ThreeDGraph from "./components/3DGraph";
import TwoDGraph from "./components/2DGraph";
import _ from "lodash";
import SideInformation from "./components/SideInformation";

const selectOptions = [
  { value: "Food", label: "Food (620)" },
  { value: "TvShow", label: "Tv Show (4k)" },
];

const graphDictionary = {
  Food: {
    cliques: FoodCliques,
    community: FoodCommunities,
  },
  TvShow: {
    cliques: TvShowCliques,
    community: TvShowCommunities,
  },
};

function App() {
  const [graphData, setGraphData] = useState(undefined);
  const [mode, setMode] = useState(undefined);
  const [visualizationMode, setVisualizationMode] = useState("2D");
  const [cliques, setCliques] = useState(undefined);
  const [highlightedNode, setHighlightedNode] = useState(undefined);
  const [communities, setCommunities] = useState(undefined);
  const [graphName, setGraphName] = useState(undefined);
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
    setGraphName("Food");
    setMode("community");
  }, []);
  useEffect(() => {
    if (graphName && mode) {
      const data = graphDictionary[graphName][mode];
      if (mode === "cliques") {
        setNodeColors([]);
        setCommunities(undefined);
        let colors = [];
        setCliques(data.max_cliques);
        setGraphData({
          nodes: data.graph_data.nodes,
          links: data.graph_data.links,
        });
        _.forEach(data.max_cliques, (clique) => {
          colors.push({ element: clique.name, color: generateColor(colors) });
        });
        setNodeColors(colors);
      } else if (mode === "community") {
        setNodeColors([]);
        setCliques(undefined);
        let colors = [];
        setCommunities(data.communities);
        setGraphData({
          nodes: data.graph.nodes,
          links: data.graph.edges,
        });
        _.forEach(data.communities, (community) => {
          colors.push({
            element: community.name,
            color: generateColor(colors),
          });
        });
        setNodeColors(colors);
      }
    }
  }, [mode, graphName]);

  useEffect(() => {
    if (!_.isEmpty(nodeColors) && graphData) {
      _.forEach(graphData.nodes, (node) => {
        const color = _.find(nodeColors, (element) => {
          return element.element === node.community_name;
        });
        node.color = color.color;
      });
    }
  }, [nodeColors]);
  return (
    <Layout
      selectOptions={selectOptions}
      graphName={graphName}
      setGraphName={setGraphName}
      mode={mode}
      setMode={setMode}
      visualizationMode={visualizationMode}
      setVisualizationMode={setVisualizationMode}
    >
      <SideInformation
        graphData={graphData}
        aggregations={cliques || communities}
        setHighlightedNode={(nodes) => setHighlightedNode(nodes)}
        highlightedNode={highlightedNode}
      />
      {visualizationMode === "2D" && (
        <TwoDGraph graphData={graphData} highlightedNode={highlightedNode} />
      )}
      {visualizationMode === "3D" && (
        <ThreeDGraph graphData={graphData} highlightedNode={highlightedNode} />
      )}
    </Layout>
  );
}

export default App;
