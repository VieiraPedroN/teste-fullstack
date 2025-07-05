// src/especialidade/especialidade.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from 'typeorm';
import { Clinica } from '../../clinica/entities/clinica.entity';

@Entity('especialidades')
export class Especialidade {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nome: string;

  @ManyToMany(() => Clinica, (clinica) => clinica.especialidades)
  clinicas: Clinica[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
