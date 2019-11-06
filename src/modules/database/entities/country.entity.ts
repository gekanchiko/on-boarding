import { Column, Entity, OneToMany } from "typeorm";

import { DbEntity } from "./db.entity";
import { CityEntity } from "./city.entity";

@Entity({
  name: "country"
})
export class CountryEntity extends DbEntity {

  @Column()
  readonly name: string;

  @OneToMany(() => CityEntity, city => city.country, { cascade: ["insert", "remove"] })
  readonly cities: CityEntity[];
}