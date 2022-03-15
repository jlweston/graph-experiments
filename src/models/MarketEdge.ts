import { BaseEdge } from "./BaseEdge";

export class MarketEdge extends BaseEdge {
  public static readonly type: string = "MarketEdge";
  public static readonly fields: string[] = ["from", "to", "description"];

  public from: string;
  public to: string;
  public description: string;
  public marketId: string;

  constructor(data: any) {
    super(data);

    this.marketId = data.marketId;
    this.description = data.description; // example custom field
  }
}
