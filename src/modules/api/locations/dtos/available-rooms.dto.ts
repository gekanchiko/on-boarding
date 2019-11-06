import { IsISO8601 } from "class-validator";

export class AvailableRoomsDTO {

  @IsISO8601()
  readonly startDate: string;

  @IsISO8601()
  readonly endDate: string;

}