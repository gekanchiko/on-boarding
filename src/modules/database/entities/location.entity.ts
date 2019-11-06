import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { DbEntity } from "./db.entity";
import { CityEntity } from "./city.entity";
import { RoomEntity } from "./room.entity";
import { PriceEntity } from "./price.entity";

@Entity({
  name: "location"
})
export class LocationEntity extends DbEntity {

  @Column()
  readonly name: string;

  @Index()
  @ManyToOne(() => CityEntity, city => city.locations, { eager: true })
  readonly city: CityEntity;

  @OneToMany(() => RoomEntity, room => room.location, {
    cascade: ["insert", "remove"],
    eager: true
  })
  readonly rooms: RoomEntity[];

  @OneToMany(() => PriceEntity, price => price.location, {
    cascade: ["insert", "remove"],
    eager: true
  })
  readonly prices: PriceEntity[];

}