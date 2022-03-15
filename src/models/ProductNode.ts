import BaseNode from "./BaseNode";

export class ProductNode extends BaseNode {
  public static readonly type: string = "ProductNode";
  public static readonly fields: string[] = [
    "name",
    "description",
    "productEndpoint",
  ];

  public key: string;
  public name: string;
  public description: string;
  public productEndpoint: string;

  constructor(data: any) {
    super(data);

    // example product-only fields
    this.productEndpoint = "http://localhost:8080/api/product/" + this.key;
  }
}
