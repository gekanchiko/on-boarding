import { IsISO8601, IsOptional } from "class-validator";
import { Expose } from "class-transformer";
import { ApiModelPropertyOptional } from "@nestjs/swagger";

export class BaseObjectDTO {

  @ApiModelPropertyOptional({
    description:
      "Entity id",
  })
  @IsOptional()
  @Expose()
  readonly id: string;

  @ApiModelPropertyOptional({
    description: "Entity creation date",
  })
  @IsOptional()
  @IsISO8601()
  @Expose()
  readonly createdAt: string;

  @ApiModelPropertyOptional({
    description: "Entity update date",
  })
  @IsOptional()
  @IsISO8601()
  @Expose()
  readonly updatedAt: string;

}