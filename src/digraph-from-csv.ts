// our types
import Graph from "./models/Graph";
import { AudienceEdge } from "./models/AudienceEdge";
import { AudienceNode } from "./models/AudienceNode";
import BaseNode from "./models/BaseNode";
import { GenericNode } from "./models/GenericNode";
import { MarketNode } from "./models/MarketNode";
import { MarketEdge } from "./models/MarketEdge";
import { ProductNode } from "./models/ProductNode";

import { csvToArrays } from "./utils/csv";

import * as render from "graphology-svg";

import * as util from "util";

const ELEMENTS = {
  AudienceEdge,
  AudienceNode,
  GenericNode,
  MarketNode,
  MarketEdge,
  ProductNode,
};

class ElementsFactory {
  static createInstance(data) {
    const elementCreator = ELEMENTS[data.model];
    const element = elementCreator ? new elementCreator(data) : null;

    return element;
  }
}

const renderTreeFromCsv = async () => {
  const svgSettings = {
    margin: 50,
    height: 512,
    width: 512,
    nodes: { defaultColor: "#8888AA" },
    edges: { defaultColor: "#444499" },
  };

  // initialise graph
  const graph = new Graph();
  const root = graph.addNode(new BaseNode({ x: 1, y: 0, size: 0.2 }));

  let parents = [root];

  let data = await csvToArrays("./dt.csv");

  data.forEach((row, rowIndex) => {
    const newParents = [];
    parents.forEach((parent) => {
      row.forEach((cell, cellIndex) => {
        const { model, ...data } = cell;
        const element = ElementsFactory.createInstance({
          model: `${cell.model}Node`,
          ...data,
          x: rowIndex,
          y: cellIndex,
        });
        if (element) {
          const node = graph.addNode(element);
          graph.addEdge({ from: parent, to: node, value: cell.value });
          newParents.push(node);
        }
      });
    });
    parents = newParents;
  });

  console.log(
    util.inspect(graph.json, {
      showHidden: false,
      depth: null,
      maxArrayLength: null,
    })
  );

  render(graph.graphology, "./graph.svg", svgSettings, () => {});
};

renderTreeFromCsv();
