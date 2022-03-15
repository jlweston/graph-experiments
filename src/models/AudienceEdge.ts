import { BaseEdge } from "./BaseEdge";

export class AudienceEdge extends BaseEdge {
  public static readonly type: string = "AudienceEdge";
  public static readonly fields: string[] = ["from", "to", "description"];

  public from: string;
  public to: string;
  public description: string;
  public audienceId: string;

  constructor(data: any) {
    super(data);

    this.audienceId = data.audienceId;
    this.description = data.description; // example custom field
  }
}
