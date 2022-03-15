import { ulid } from "ulid";

export default class BaseNode {
  public key: string;
  public name: string;
  public description: string;
  public x: number;
  public y: number;

  constructor(data: any) {
    this.key = data.key || ulid();
    this.x = data.x;
    this.y = data.y;

    // optional fields as an example
    this.name = data.name;
  }
}
