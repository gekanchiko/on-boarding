import { Column, Entity, Index, ManyToOne } from "typeorm";
import { DbEntity } from "./db.entity";
import { RoomEntity } from "./room.entity";

@Entity({
  name: "book"
})
export class BookEntity extends DbEntity {

  @Index()
  @ManyToOne(() => RoomEntity, room => room.bookings, { eager: true })
  readonly room: RoomEntity;

  @Column()
  readonly checkInDate: Date;

  @Column()
  readonly checkOutDate: Date;

}