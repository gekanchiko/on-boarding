import { Expose, Type } from "class-transformer";
import { ApiModelProperty } from "@nestjs/swagger";

import { CityDTO } from "./city.dto";
import { BaseObjectDTO } from "./base-object.dto";

export class LocationDTO extends BaseObjectDTO {

  @ApiModelProperty({
    description: "Location name",
    readOnly: true
  })
  @Expose()
  readonly name: string;

  @ApiModelProperty({
    description: "The city the location is placed"
  })
  @Expose()
  @Type(() => CityDTO)
  readonly city: CityDTO;

}