import { DirectedGraph } from "graphology";
import { subgraph } from "graphology-operators";
import * as render from "graphology-svg";
import { allSimplePaths } from "graphology-simple-path";
import { edgePathFromNodePath } from "graphology-shortest-path";

const svgSettings = {
  margin: 20,
  height: 512,
  width: 512,
  nodes: { defaultColor: "#8888AA" },
  edges: { defaultColor: "#444499" },
};

// initialise graph
const graph = new DirectedGraph();

// add nodes
const a = graph.addNode("A", { nodeType: "start", x: 1, y: 0, size: 0.2 });
const b = graph.addNode("B", { x: 0, y: 1, size: 0.2 });
const c = graph.addNode("C", { x: 1, y: 1, size: 0.2 });
const d = graph.addNode("D", { x: 2, y: 1, size: 0.2 });
const e = graph.addNode("E", { x: 0, y: 2, size: 0.2 });
const f = graph.addNode("F", { x: 2, y: 2, size: 0.2 });

// add edges
graph.addDirectedEdge(a, b, { market: "1" });
graph.addDirectedEdge(a, c, { market: "2" });
graph.addDirectedEdge(a, d, { market: "3" });
graph.addDirectedEdge(b, e, { audience: "1" });
graph.addDirectedEdge(c, f, { audience: "2" });
graph.addDirectedEdge(d, f, { audience: "3" });

render(graph, "./graph.svg", svgSettings, () => console.log("Done!"));

// get a subgraph given a start and end node
const start = "A";
const end = "F";

const paths = allSimplePaths(graph, start, end);
const nodesInPaths = paths.reduce((acc, path) => acc.concat(path), []);
const uniqueNodesInPaths = Array.from(new Set(nodesInPaths));

// render the subgraph
const sub = subgraph(graph, uniqueNodesInPaths);
render(sub, "./subgraph.svg", svgSettings, () => console.log("Done!"));

// generate matrix from paths
const rows = [];
for (const path of paths) {
  const row = [];
  const edgePath = edgePathFromNodePath(graph, path);
  for (const edge of edgePath) {
    const attributes = graph.getEdgeAttributes(edge);
    row.push(attributes);
  }
  rows.push(row);
}

console.log(rows);
