import { Expose, Type } from "class-transformer";
import { ApiModelProperty } from "@nestjs/swagger";

import { BaseObjectDTO } from "./base-object.dto";
import { CountryDTO } from "./country.dto";

export class CityDTO extends BaseObjectDTO {

  @ApiModelProperty({
    description: "The name of the city",
    readOnly: true
  })
  @Expose()
  readonly name: string;

  @ApiModelProperty({
    description: "The country the city is located"
  })
  @Expose()
  @Type(() => CountryDTO)
  readonly country: CountryDTO;
}