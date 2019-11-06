import { Expose } from "class-transformer";
import { ApiModelProperty } from "@nestjs/swagger";

import { BaseObjectDTO } from "./base-object.dto";
import { RoomDTO } from "./room.dto";

export class BookDTO extends BaseObjectDTO {

  @ApiModelProperty({
    description: "Check in date",
    readOnly: true
  })
  @Expose()
  readonly checkInDate: Date;

  @ApiModelProperty({
    description: "Check out date",
    readOnly: true
  })
  @Expose()
  readonly checkOutDate: Date;

  @ApiModelProperty({
    description: "Booked room info",
    readOnly: true
  })
  @Expose()
  readonly room: RoomDTO;

}