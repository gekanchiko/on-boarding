import { Expose } from "class-transformer";

import { BaseObjectDTO } from "./base-object.dto";
import { RoomType } from "../enums/room-type.enum";
import {ApiModelProperty} from "@nestjs/swagger";

export class RoomDTO extends BaseObjectDTO {

  @ApiModelProperty({
    description: "The room name",
    readOnly: true
  })
  @Expose()
  readonly name: string;

  @ApiModelProperty({
    description: "Type of the room",
    readOnly: true,
    enum: RoomType
  })
  @Expose()
  readonly type: RoomType;

}