import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";

import { DbEntity } from "./db.entity";
import { CountryEntity } from "./country.entity";
import { LocationEntity } from "./location.entity";

@Entity({
  name: "city"
})
export class CityEntity extends DbEntity {

  @Column()
  readonly name: string;

  @Index()
  @ManyToOne(() => CountryEntity, country => country.cities, { onDelete: "CASCADE", eager: true })
  readonly country: CountryEntity;

  @OneToMany(() => LocationEntity, location => location.city, {
    cascade: ["insert", "remove"]
  })
  readonly locations: LocationEntity;

}