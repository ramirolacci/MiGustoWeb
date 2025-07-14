import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mandrill from 'mandrill-api/mandrill';
import * as mailchimp from '@mailchimp/mailchimp_marketing';
import { Express } from 'express';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private mandrillClient: any;
  private mailchimpClient: typeof mailchimp;
  private audienceId: string;
  private sheetdbUrl: string;

  constructor(private configService: ConfigService) {
    this.mandrillClient = new mandrill.Mandrill(this.configService.get<string>('MANDRILL_API_KEY'));
    this.mailchimpClient = mailchimp;
    this.mailchimpClient.setConfig({
      apiKey: this.configService.get<string>('MAILCHIMP_API_KEY'),
      server: (this.configService.get<string>('MAILCHIMP_API_KEY') || '').split('-')[1],
    });
    this.audienceId = this.configService.get<string>('MAILCHIMP_AUDIENCE_ID') || '';
    this.sheetdbUrl = this.configService.get<string>('VITE_SHEETDB_URL') || '';
  }

  async sendMail(to: string, subject: string, text: string, html?: string, sheetData?: any) {
    // 1. Enviar mail de bienvenida al usuario
    await this.mandrillClient.messages.send({
      message: {
        from_email: 'development@migusto.com.ar',
        to: [{ email: to, type: 'to' }],
        subject: subject,
        html: html,
        text: text,
      }
    });

    // 2. Enviar mail de notificación interna a development@migusto.com.ar
    if (to !== 'development@migusto.com.ar') {
      await this.mandrillClient.messages.send({
        message: {
          from_email: 'development@migusto.com.ar',
          to: [{ email: 'development@migusto.com.ar', type: 'to' }],
          subject: 'Nuevo registro Mi Gusto Lovers',
          text: text,
          html: html,
        }
      });
    }

    // 3. Suscribir usuario a Mailchimp
    if (sheetData && sheetData.email) {
      try {
        await this.mailchimpClient.lists.addListMember(this.audienceId, {
          email_address: sheetData.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: sheetData.nombre || '',
            PHONE: sheetData.telefono || '',
            SUCURSAL: sheetData.sucursal || '',
            CUMPLE: sheetData.cumple || '',
            CLIENTE: sheetData.esCliente || '',
            SABORES: sheetData.saboresFavoritos || '',
          }
        });
      } catch (err) {
        // Si ya está suscripto u otro error, solo loguear
        console.error('Error suscribiendo a Mailchimp:', err);
      }
    }

    // 4. Registrar en SheetDB si hay datos y la URL está configurada
    if (sheetData && this.sheetdbUrl) {
      try {
        await fetch(this.sheetdbUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: [sheetData] })
        });
      } catch (err) {
        // No lanzar error si falla el registro en SheetDB, solo loguear
        console.error('Error registrando en SheetDB:', err);
      }
    }
  }

  async sendTrabajaMail(datos: { nombre: string; apellido: string; telefono: string; email: string; puesto: string; area?: string }, file: any) {
    const { nombre, apellido, telefono, email, puesto, area } = datos;
    const subject = `Nuevo postulante: ${nombre} ${apellido}`;
    let text = `Nombre: ${nombre}\nApellido: ${apellido}\nTeléfono: ${telefono}\nEmail: ${email}\nPuesto: ${puesto}`;
    let html = `<p><b>Nombre:</b> ${nombre}</p><p><b>Apellido:</b> ${apellido}</p><p><b>Teléfono:</b> ${telefono}</p><p><b>Email:</b> ${email}</p><p><b>Puesto:</b> ${puesto}</p>`;
    if (area) {
      text += `\nÁrea: ${area}`;
      html += `<p><b>Área:</b> ${area}</p>`;
    }

    // Configurar el transporte de nodemailer (puedes ajustar con tus credenciales reales)
    const transporter = nodemailer.createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Enviar el mail con el adjunto
    await transporter.sendMail({
      from: 'development@migusto.com.ar',
      to: 'development@migusto.com.ar',
      subject,
      text,
      html,
      attachments: [
        {
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        },
      ],
    });
  }

  async sendProveedorMail(datos: { nombreEmpresa: string; razonSocial: string; telefono: string; email: string; descripcion: string }) {
    const { nombreEmpresa, razonSocial, telefono, email, descripcion } = datos;
    const subject = `Nuevo proveedor: ${nombreEmpresa}`;
    const text = `Nombre de la empresa: ${nombreEmpresa}\nRazón social: ${razonSocial}\nTeléfono: ${telefono}\nEmail: ${email}\nDescripción: ${descripcion}`;
    const html = `<p><b>Nombre de la empresa:</b> ${nombreEmpresa}</p><p><b>Razón social:</b> ${razonSocial}</p><p><b>Teléfono:</b> ${telefono}</p><p><b>Email:</b> ${email}</p><p><b>Descripción:</b> ${descripcion}</p>`;

    const transporter = require('nodemailer').createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: 'development@migusto.com.ar',
      to: 'development@migusto.com.ar',
      subject,
      text,
      html,
    });
  }

  async sendCorporativaMail(datos: { nombreEmpresa: string; telefono: string; fechaEvento: string; cantidadDocenas: string; cantidadComensales: string; descripcionEvento: string; observaciones: string }) {
    const { nombreEmpresa, telefono, fechaEvento, cantidadDocenas, cantidadComensales, descripcionEvento, observaciones } = datos;
    const subject = `Venta corporativa: ${nombreEmpresa}`;
    const text = `Nombre de empresa: ${nombreEmpresa}\nTeléfono: ${telefono}\nFecha del evento: ${fechaEvento}\nCantidad estimada de docenas: ${cantidadDocenas}\nCantidad de comensales: ${cantidadComensales}\nDescripción del evento: ${descripcionEvento}\nObservaciones especiales: ${observaciones}`;
    const html = `<p><b>Nombre de empresa:</b> ${nombreEmpresa}</p><p><b>Teléfono:</b> ${telefono}</p><p><b>Fecha del evento:</b> ${fechaEvento}</p><p><b>Cantidad estimada de docenas:</b> ${cantidadDocenas}</p><p><b>Cantidad de comensales:</b> ${cantidadComensales}</p><p><b>Descripción del evento:</b> ${descripcionEvento}</p><p><b>Observaciones especiales:</b> ${observaciones}</p>`;

    const transporter = require('nodemailer').createTransport({
      host: this.configService.get<string>('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.get<string>('SMTP_USER'),
        pass: this.configService.get<string>('SMTP_PASS'),
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: 'development@migusto.com.ar',
      to: 'development@migusto.com.ar',
      subject,
      text,
      html,
    });
  }
} 