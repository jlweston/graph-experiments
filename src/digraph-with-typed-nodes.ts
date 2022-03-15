// our types
import Graph from "./models/Graph";
import { MarketNode } from "./models/MarketNode";
import { MarketEdge } from "./models/MarketEdge";

// utilities types from graphology
import { subgraph } from "graphology-operators";
import { allSimplePaths } from "graphology-simple-path";
import { edgePathFromNodePath } from "graphology-shortest-path";

// rendering
import * as render from "graphology-svg";
import { AudienceEdge } from "./models/AudienceEdge";

const svgSettings = {
  margin: 20,
  height: 512,
  width: 512,
  nodes: { defaultColor: "#8888AA" },
  edges: { defaultColor: "#444499" },
};

// initialise graph
const graph = new Graph();

// add nodes
const a = graph.addNode(
  new MarketNode({ key: "A", nodeType: "start", x: 1, y: 0, size: 0.2 })
);
const b = graph.addNode(new MarketNode({ key: "B", x: 0, y: 1, size: 0.2 }));
const c = graph.addNode(new MarketNode({ key: "C", x: 1, y: 1, size: 0.2 }));
const d = graph.addNode(new MarketNode({ key: "D", x: 2, y: 1, size: 0.2 }));
const e = graph.addNode(new MarketNode({ key: "E", x: 0, y: 2, size: 0.2 }));
const f = graph.addNode(new MarketNode({ key: "F", x: 2, y: 2, size: 0.2 }));

// add edges
graph.addEdge(new MarketEdge({ from: a, to: b, marketId: "1" }));
graph.addEdge(new MarketEdge({ from: a, to: c, marketId: "2" }));
graph.addEdge(new MarketEdge({ from: a, to: d, marketId: "3" }));
graph.addEdge(new AudienceEdge({ from: b, to: e, audienceId: "1" }));
graph.addEdge(new AudienceEdge({ from: c, to: f, audienceId: "2" }));
graph.addEdge(new AudienceEdge({ from: d, to: f, audienceId: "3" }));

console.log(graph.json);

render(graph.graphology, "./graph.svg", svgSettings, () =>
  console.log("Done!")
);

// get a subgraph given a start and end node
const start = "A";
const end = "F";

const paths = allSimplePaths(graph.graphology, start, end);
const nodesInPaths = paths.reduce((acc, path) => acc.concat(path), []);
const uniqueNodesInPaths = Array.from(new Set(nodesInPaths));

// render the subgraph
const sub = subgraph(graph.graphology, uniqueNodesInPaths);
render(sub, "./subgraph.svg", svgSettings, () => console.log("Done!"));

// generate matrix from paths
const rows = [];
for (const path of paths) {
  const row = [];
  const edgePath = edgePathFromNodePath(graph.graphology, path);
  for (const edge of edgePath) {
    const attributes = graph.getEdgeAttributes(edge);
    row.push(attributes);
  }
  rows.push(row);
}

console.log(rows);
