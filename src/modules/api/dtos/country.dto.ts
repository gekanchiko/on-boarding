import { Expose } from "class-transformer";
import { ApiModelProperty } from "@nestjs/swagger";

import { BaseObjectDTO } from "./base-object.dto";

export class CountryDTO extends BaseObjectDTO {

  @ApiModelProperty({
    description: "The name of the country",
    readOnly: true
  })
  @Expose()
  readonly name: string;

}