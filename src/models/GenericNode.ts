import BaseNode from "./BaseNode";

export class GenericNode extends BaseNode {
  public static readonly type: string = "GenericNode";
  public static readonly fields: string[] = ["name", "description", "props"];

  public key: string;
  public name: string;
  public description: string;
  public props: Record<string, any>;

  constructor(data: any) {
    super(data);

    // example market-only fields
    this.props = data.props;
  }
}
