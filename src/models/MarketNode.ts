import BaseNode from "./BaseNode";

export class MarketNode extends BaseNode {
  public static readonly type: string = "MarketNode";
  public static readonly fields: string[] = [
    "name",
    "description",
    "marketEndpoint",
  ];

  public key: string;
  public name: string;
  public description: string;
  public marketEndpoint: string;

  constructor(data: any) {
    super(data);

    // example market-only fields
    this.marketEndpoint = "http://localhost:8080/api/market/" + this.key;
  }
}
