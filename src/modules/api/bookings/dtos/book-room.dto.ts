import {IsOptional, IsUUID} from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

import { RoomType } from "../../enums/room-type.enum";

export class BookRoomDTO {

  @ApiModelProperty({
    description: "Location ID",
    readOnly: true
  })
  @IsUUID()
  readonly locationId: string;

  @ApiModelProperty({
    description: "Room type",
    readOnly: true,
    enum: RoomType
  })
  readonly roomType: RoomType;

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