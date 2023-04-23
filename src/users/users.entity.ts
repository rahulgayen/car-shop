import { AfterInsert, AfterLoad, AfterRemove, AfterUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @AfterInsert()
  afterInsert() {
    console.log('Successfull insertion', this.id);
  }

  @AfterLoad()
  afterLoad() {
    console.log('Successfull Load', this.id);
  }

  @AfterUpdate()
  afterUpdate() {
    console.log('Successfull update for ', this.id);
  }
  @AfterRemove()
  afterRemove() {
    console.log('Sucessfully removed', this.id);
  }
}
