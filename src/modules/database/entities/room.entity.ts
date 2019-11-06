import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";

import { DbEntity } from "./db.entity";
import { LocationEntity } from "./location.entity";
import { RoomType } from "../../api/enums/room-type.enum";
import { BookEntity } from "./book.entity";

@Entity({
  name: "room"
})
export class RoomEntity extends DbEntity {

  @Column()
  readonly name: string;

  @Column()
  readonly type: RoomType;

  @Index()
  @ManyToOne(() => LocationEntity, location => location.rooms)
  readonly location: LocationEntity;

  @OneToMany(() => BookEntity, book => book.room, { cascade: ["insert"] })
  readonly bookings: BookEntity[];

}