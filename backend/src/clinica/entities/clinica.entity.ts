// src/clinica/clinica.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Regional } from '../../regional/entities/regional.entity';
import { Especialidade } from '../../especialidade/entities/especialidade.entity';

@Entity('clinicas')
export class Clinica {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  razao_social: string;

  @Column()
  nome_fantasia: string;

  @Column({ unique: true })
  cnpj: string;

  @Column({ type: 'date' })
  data_inauguracao: Date;

  @Column({ default: true })
  ativa: boolean;

  @ManyToOne(() => Regional, (regional) => regional.clinicas)
  @JoinColumn({ name: 'regional_id' })
  regional: Regional;

  @ManyToMany(() => Especialidade, (especialidade) => especialidade.clinicas)
  @JoinTable({
    name: 'clinicas_especialidades',
    joinColumn: { name: 'clinica_id' },
    inverseJoinColumn: { name: 'especialidade_id' },
  })
  especialidades: Especialidade[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
