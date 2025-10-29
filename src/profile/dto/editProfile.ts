import { IsEmail, IsString, IsOptional, Length, Matches, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeHtml } from "src/utils/escapeHtmls";

export class EditProfileDTO {
  
  @IsEmail({}, { message: 'Debes poner un email válido' })
  @MinLength(6, { message: 'Email demasiado corto' })
  @MaxLength(30, { message: 'Email demasiado largo' })
  @Transform(({ value }) => (value || '').trim().replace(/\s+/g, '').toLowerCase())
  @IsNotEmpty({ message: 'Ningún campo puede estar vacío' })
  @Transform(({ value }) => escapeHtml(value))
  email: string;

  @IsString({ message: 'El nombre debe ser texto' })
  @Length(2, 10, { message: 'Nombre debe contener entre 2 y 10 caracteres' })
  @Transform(({ value }) => (value || '').trim().replace(/\s+/g, ' '))
  @IsNotEmpty({ message: 'Ningún campo puede estar vacío' })
  @Transform(({ value }) => escapeHtml(value))
  name: string;

  @IsString({ message: 'El apellido debe ser texto' })
  @Length(2, 10, { message: 'Apellido debe contener entre 2 y 10 caracteres' })
  @IsNotEmpty({ message: 'Ningún campo puede estar vacío' })
  @Transform(({ value }) => (value || '').trim().replace(/\s+/g, ' '))
  @Transform(({ value }) => escapeHtml(value))
  lastname: string;

  @IsOptional()
  @Matches(/^[0-9]+$/, { message: 'El teléfono solo puede contener números' })
  @Length(7, 15, { message: 'El teléfono debe tener entre 7 y 15 dígitos' })
  @IsNotEmpty({ message: 'Ningún campo puede estar vacío' })
  @Transform(({ value }) => (value || '').trim().replace(/\s+/g, ''))
  @Transform(({ value }) => escapeHtml(value))
  phone?: string;
}
