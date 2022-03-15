import { DirectedGraph } from "graphology";
import { BaseEdge } from "./BaseEdge";
import BaseNode from "./BaseNode";

export default class Graph {
  public static readonly type: string = "Graph";
  public static readonly fields: string[] = [
    "id",
    "name",
    "description",
    "nodes",
    "edges",
  ];

  public id: string;
  public name: string;
  public description: string;

  public graph: DirectedGraph;

  constructor() {
    this.graph = new DirectedGraph();
  }

  public addNode(node: BaseNode): string {
    const { key, ...options } = node;
    return this.graph.addNode(key, options);
  }

  public addEdge(edge: BaseEdge): string {
    const { from, to, ...options } = edge;
    return this.graph.addEdge(from, to, options);
  }

  get edges() {
    return this.graph.edges();
  }

  get nodes() {
    return this.graph.nodes();
  }

  get json() {
    return this.graph.toJSON();
  }

  get graphology() {
    return this.graph;
  }

  getEdgeAttributes(edge) {
    return this.graph.getEdgeAttributes(edge);
  }
}
