import { IsEmail,MinLength,MaxLength,IsNotEmpty } from "class-validator";
import { Transform } from "class-transformer";
import { escapeHtml } from "src/utils/escapeHtmls";

export class RecuperationEmailDTO{
    @IsEmail({}, { message: 'Debes poner un email válido' })
    @MinLength(6, { message: 'Email demasiado corto' })
    @IsNotEmpty({ message: 'Ningún campo puede estar vacío' })
    @MaxLength(30, { message: 'Email demasiado largo' })
    @Transform(({ value }) => (value || '').trim().replace(/\s+/g, '').toLowerCase())
    @Transform(({ value }) => escapeHtml(value))
    email: string;
}