import { Expose } from "class-transformer";
import { IsPositive } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

import { BaseObjectDTO } from "./base-object.dto";
import { RoomType } from "../enums/room-type.enum";

export class PriceDTO extends BaseObjectDTO {

  @ApiModelProperty({
    description: "Type of the room",
    readOnly: true,
    enum: RoomType
  })
  @Expose()
  readonly roomType: RoomType;

  @ApiModelProperty({
    description: "Amount of money",
    readOnly: true
  })
  @Expose()
  @IsPositive()
  readonly amount: number;

}