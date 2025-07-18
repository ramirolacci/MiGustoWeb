import { Controller, Post, Body, BadRequestException, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MailService } from './mail.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(@Body() body: { to: string; subject: string; text: string; html?: string; sheetData?: any }) {
    const { to, subject, text, html, sheetData } = body;
    if (!to || !subject || !text) {
      throw new BadRequestException('Faltan campos requeridos: to, subject, text');
    }
    await this.mailService.sendMail(to, subject, text, html, sheetData);
    return { message: 'Correo enviado correctamente' };
  }

  @Post('trabaja')
  @UseInterceptors(FileInterceptor('cv', { storage: memoryStorage() }))
  async trabajaConNosotros(
    @UploadedFile() file: any,
    @Body() body: { nombre: string; apellido: string; telefono: string; email: string; puesto: string; area?: string }
  ) {
    console.log('Archivo recibido:', {
      originalname: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      buffer: file.buffer ? 'OK' : 'NO BUFFER'
    });
    if (!file) {
      throw new BadRequestException('Falta el archivo CV');
    }
    const { nombre, apellido, telefono, email, puesto, area } = body;
    if (!nombre || !apellido || !telefono || !email || !puesto) {
      throw new BadRequestException('Faltan campos requeridos');
    }
    await this.mailService.sendTrabajaMail({ nombre, apellido, telefono, email, puesto, area }, file);
    return { message: 'Formulario enviado correctamente' };
  }

  @Post('proveedor')
  async proveedor(
    @Body() body: { nombreEmpresa: string; razonSocial: string; telefono: string; email: string; descripcion: string }
  ) {
    const { nombreEmpresa, razonSocial, telefono, email, descripcion } = body;
    if (!nombreEmpresa || !razonSocial || !telefono || !email) {
      throw new BadRequestException('Faltan campos requeridos');
    }
    await this.mailService.sendProveedorMail({ nombreEmpresa, razonSocial, telefono, email, descripcion });
    return { message: 'Formulario de proveedor enviado correctamente' };
  }

  @Post('corporativa')
  async corporativa(
    @Body() body: {
      mailCorporativo: string;
      nombreApellido: string;
      telefono: string;
      fechaEvento: string;
      cantidadDocenas: string;
      cantidadComensales: string;
      descripcionEvento: string;
      observaciones: string;
    }
  ) {
    const { mailCorporativo, nombreApellido, telefono, fechaEvento, cantidadDocenas, cantidadComensales, descripcionEvento } = body;
    if (!mailCorporativo || !nombreApellido || !telefono || !fechaEvento || !cantidadDocenas || !cantidadComensales || !descripcionEvento) {
      throw new BadRequestException('Faltan campos requeridos');
    }
    await this.mailService.sendCorporativaMail(body);
    return { message: 'Formulario de venta corporativa enviado correctamente' };
  }

  @Post('franquicia')
  async franquicia(
    @Body() body: {
      nombre: string;
      fechaNacimiento: string;
      sexo: string;
      estadoCivil: string;
      tipoDocumento: string;
      numeroDocumento: string;
      paisResidencia: string;
      provinciaResidencia: string;
      localidadResidencia: string;
      domicilio: string;
      telefonoCelular: string;
      telefonoAlternativo?: string;
      email: string;
      emailAlternativo?: string;
      paisPreferencia: string;
      provinciaPreferencia: string;
      localidadPreferencia: string;
      inmuebleGarantia: string;
    }
  ) {
    const {
      nombre,
      fechaNacimiento,
      sexo,
      estadoCivil,
      tipoDocumento,
      numeroDocumento,
      paisResidencia,
      provinciaResidencia,
      localidadResidencia,
      domicilio,
      telefonoCelular,
      email,
      paisPreferencia,
      provinciaPreferencia,
      localidadPreferencia,
      inmuebleGarantia
    } = body;
    if (!nombre || !fechaNacimiento || !sexo || !estadoCivil || !tipoDocumento || !numeroDocumento || !paisResidencia || !provinciaResidencia || !localidadResidencia || !domicilio || !telefonoCelular || !email || !paisPreferencia || !provinciaPreferencia || !localidadPreferencia || !inmuebleGarantia) {
      throw new BadRequestException('Faltan campos requeridos');
    }
    await this.mailService.sendFranquiciaMail(body);
    return { message: 'Formulario de franquicia enviado correctamente' };
  }
} 