import { Column, Entity, Index, ManyToOne } from "typeorm";

import { DbEntity } from "./db.entity";
import { LocationEntity } from "./location.entity";
import { RoomType } from "../../api/enums/room-type.enum";

@Entity({
  name: "price"
})
@Index(["location", "roomType"], { unique: true })
export class PriceEntity extends DbEntity {

  @ManyToOne(() => LocationEntity, location => location.prices)
  readonly location: LocationEntity;

  @Column()
  readonly roomType: RoomType;

  @Column()
  readonly amount: number;
}