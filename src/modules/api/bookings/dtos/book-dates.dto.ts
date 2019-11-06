import { ApiModelProperty } from "@nestjs/swagger";

export class BookDatesDTO {

  @ApiModelProperty({
    description: "Check in date",
    readOnly: true
  })
  readonly startDate: string;

  @ApiModelProperty({
    description: "Check out date",
    readOnly: true
  })
  readonly endDate: string;

}