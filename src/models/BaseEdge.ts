export class BaseEdge {
  public from: string;
  public to: string;
  public value: string;

  constructor(data: any) {
    this.from = data.from; // source node
    this.to = data.to; // target node
    this.value = data.value || null;
  }
}
