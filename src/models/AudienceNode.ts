import BaseNode from "./BaseNode";

export class AudienceNode extends BaseNode {
  public static readonly type: string = "AudienceNode";
  public static readonly fields: string[] = [
    "name",
    "description",
    "audienceEndpoint",
  ];

  public key: string;
  public name: string;
  public description: string;
  public audienceEndpoint: string;

  constructor(data: any) {
    super(data);

    // example audience-only fields
    this.audienceEndpoint = "http://localhost:8080/api/audience/" + this.key;
  }
}
