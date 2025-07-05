import { IsOptional, IsString, IsBooleanString } from 'class-validator';

export class FilterClinicaDto {
  @IsOptional()
  @IsString()
  busca?: string;

  @IsOptional()
  @IsBooleanString()
  ativa?: string;

  @IsOptional()
  page?: number;

  @IsOptional()
  limit?: number;
}
