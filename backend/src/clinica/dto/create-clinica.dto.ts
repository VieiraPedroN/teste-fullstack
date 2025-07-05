import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  IsDateString,
  IsUUID,
  ArrayNotEmpty,
  ArrayUnique,
  Matches,
} from 'class-validator';

export class CreateClinicaDto {
  @IsString()
  @IsNotEmpty()
  razao_social: string;

  @IsString()
  @IsNotEmpty()
  nome_fantasia: string;

  @Matches(/^\d{14}$/, {
    message: 'CNPJ deve conter exatamente 14 dígitos numéricos',
  })
  cnpj: string;

  @IsDateString()
  data_inauguracao: Date;

  @IsBoolean()
  ativa: boolean;

  @IsUUID()
  regional_id: string;

  @ArrayNotEmpty()
  @ArrayUnique()
  especialidade_id: string[];
}
