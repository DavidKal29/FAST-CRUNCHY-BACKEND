import { IsString, Length, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { escapeHtml } from "src/utils/escapeHtmls";

export class AddressDTO {

  @IsString({ message: 'El nombre debe ser texto' })
  @Length(2, 20, { message: 'Nombre debe contener entre 2 y 15 caracteres' })
  @Transform(({ value }) => (value || '').trim().replace(/\s+/g, ' '))
  @IsNotEmpty({ message: 'Ningún campo puede estar vacío' })
  @Transform(({ value }) => escapeHtml(value))
  name: string;

  @IsString({ message: 'La dirección debe ser texto' })
  @Length(2, 50, { message: 'Dirección debe contener entre 2 y 50 caracteres' })
  @IsNotEmpty({ message: 'Ningún campo puede estar vacío' })
  @Transform(({ value }) => (value || '').trim().replace(/\s+/g, ' '))
  @Transform(({ value }) => escapeHtml(value))
  address: string;

  
}
