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
  private audienceIdLovers: string;
  private audienceIdCorporativa: string;
  private audienceIdFranquicias: string;
  private sheetdbUrl: string;

  constructor(private configService: ConfigService) {
    this.mandrillClient = new mandrill.Mandrill(this.configService.get<string>('MANDRILL_API_KEY'));
    this.mailchimpClient = mailchimp;
    this.mailchimpClient.setConfig({
      apiKey: this.configService.get<string>('MAILCHIMP_API_KEY'),
      server: (this.configService.get<string>('MAILCHIMP_API_KEY') || '').split('-')[1],
    });
    this.audienceIdLovers = this.configService.get<string>('MAILCHIMP_AUDIENCE_ID_LOVERS') || '';
    this.audienceIdCorporativa = this.configService.get<string>('MAILCHIMP_AUDIENCE_ID_CORPORATIVA') || '';
    this.audienceIdFranquicias = this.configService.get<string>('MAILCHIMP_AUDIENCE_ID_FRANQUICIAS') || '';
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
        await this.mailchimpClient.lists.addListMember(this.audienceIdLovers, {
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

  async sendCorporativaMail(datos: { mailCorporativo: string; nombreApellido: string; telefono: string; fechaEvento: string; cantidadDocenas: string; cantidadComensales: string; descripcionEvento: string; observaciones: string }) {
    const { mailCorporativo, nombreApellido, telefono, fechaEvento, cantidadDocenas, cantidadComensales, descripcionEvento, observaciones } = datos;
    const subject = `Venta corporativa: ${nombreApellido}`;
    const text = `Nombre y apellido: ${nombreApellido}\nMail corporativo: ${mailCorporativo}\nTeléfono: ${telefono}\nFecha del evento: ${fechaEvento}\nCantidad de docenas: ${cantidadDocenas}\nCantidad de comensales: ${cantidadComensales}\nDescripción del evento: ${descripcionEvento}\nObservaciones especiales: ${observaciones}`;
    const html = `<p><b>Nombre y apellido:</b> ${nombreApellido}</p><p><b>Mail corporativo:</b> ${mailCorporativo}</p><p><b>Teléfono:</b> ${telefono}</p><p><b>Fecha del evento:</b> ${fechaEvento}</p><p><b>Cantidad de docenas:</b> ${cantidadDocenas}</p><p><b>Cantidad de comensales:</b> ${cantidadComensales}</p><p><b>Descripción del evento:</b> ${descripcionEvento}</p><p><b>Observaciones especiales:</b> ${observaciones}</p>`;

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

    // Mail interno
    await transporter.sendMail({
      from: 'development@migusto.com.ar',
      to: 'development@migusto.com.ar',
      subject,
      text,
      html,
    });

    // Mail de confirmación al usuario
    const htmlConfirmacion = `
      <div style="font-family: Arial, sans-serif; background: #fffbe6; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #ffe082;">
        <h2 style="color: #d4a200;">¡Gracias por tu solicitud de venta corporativa!</h2>
        <p style="font-size: 1.1rem; color: #333;">Hola <b>${nombreApellido}</b>,</p>
        <p style="font-size: 1.05rem; color: #333;">
          Hemos recibido tu solicitud para una venta corporativa.<br/>
          Nuestro equipo analizará la información y se pondrá en contacto contigo a la brevedad.<br/><br/>
          ¡Gracias por confiar en Mi Gusto para tu evento!
        </p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #ffe082;"/>
        <p style="font-size: 0.98rem; color: #888;">Este es un mensaje automático, por favor no respondas a este correo.<br/>Equipo Mi Gusto</p>
      </div>
    `;
    await transporter.sendMail({
      from: 'development@migusto.com.ar',
      to: mailCorporativo,
      subject: '¡Gracias por tu solicitud de venta corporativa!',
      html: htmlConfirmacion,
    });

    // Suscribir a Mailchimp (audience ID corporativa)
    try {
      await this.mailchimpClient.lists.addListMember(this.audienceIdCorporativa, {
        email_address: mailCorporativo,
        status: 'subscribed',
        merge_fields: {
          NOMAPELLID: nombreApellido || '',
          TELEFONO: telefono || '',
          FECHA_EVT: fechaEvento || '',
          DOCENAS: cantidadDocenas || '',
          COMENSALES: cantidadComensales || '',
          DESCRIPCIO: descripcionEvento || '',
          OBSERVACIO: observaciones || '',
        }
      });
    } catch (err) {
      // Si ya está suscripto u otro error, solo loguear
      console.error('Error suscribiendo a Mailchimp (corporativa):', err);
    }
  }

  async sendFranquiciaMail(datos: {
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
  }) {
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
      telefonoAlternativo,
      email,
      emailAlternativo,
      paisPreferencia,
      provinciaPreferencia,
      localidadPreferencia,
      inmuebleGarantia
    } = datos;
    const subject = `Nueva solicitud de franquicia: ${nombre}`;
    const text = `Nombre: ${nombre}\nFecha de nacimiento: ${fechaNacimiento}\nSexo: ${sexo}\nEstado civil: ${estadoCivil}\nTipo de documento: ${tipoDocumento}\nNúmero de documento: ${numeroDocumento}\nPaís de residencia: ${paisResidencia}\nProvincia de residencia: ${provinciaResidencia}\nLocalidad de residencia: ${localidadResidencia}\nDomicilio: ${domicilio}\nTeléfono celular: ${telefonoCelular}\nTeléfono alternativo: ${telefonoAlternativo || '-'}\nEmail: ${email}\nEmail alternativo: ${emailAlternativo || '-'}\nPaís de preferencia: ${paisPreferencia}\nProvincia de preferencia: ${provinciaPreferencia}\nLocalidad de preferencia: ${localidadPreferencia}\n¿Dispone de inmueble para garantía?: ${inmuebleGarantia}`;
    const html = `
      <h2>Nueva solicitud de franquicia</h2>
      <ul>
        <li><b>Nombre:</b> ${nombre}</li>
        <li><b>Fecha de nacimiento:</b> ${fechaNacimiento}</li>
        <li><b>Sexo:</b> ${sexo}</li>
        <li><b>Estado civil:</b> ${estadoCivil}</li>
        <li><b>Tipo de documento:</b> ${tipoDocumento}</li>
        <li><b>Número de documento:</b> ${numeroDocumento}</li>
        <li><b>País de residencia:</b> ${paisResidencia}</li>
        <li><b>Provincia de residencia:</b> ${provinciaResidencia}</li>
        <li><b>Localidad de residencia:</b> ${localidadResidencia}</li>
        <li><b>Domicilio:</b> ${domicilio}</li>
        <li><b>Teléfono celular:</b> ${telefonoCelular}</li>
        <li><b>Teléfono alternativo:</b> ${telefonoAlternativo || '-'}</li>
        <li><b>Email:</b> ${email}</li>
        <li><b>Email alternativo:</b> ${emailAlternativo || '-'}</li>
        <li><b>País de preferencia:</b> ${paisPreferencia}</li>
        <li><b>Provincia de preferencia:</b> ${provinciaPreferencia}</li>
        <li><b>Localidad de preferencia:</b> ${localidadPreferencia}</li>
        <li><b>¿Dispone de inmueble para garantía?:</b> ${inmuebleGarantia}</li>
      </ul>
    `;
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
    // Mail interno a development@migusto.com.ar
    await transporter.sendMail({
      from: 'development@migusto.com.ar',
      to: 'development@migusto.com.ar',
      subject,
      text,
      html,
    });

    // Mail de felicitación al postulante
    const htmlFelicitacion = `
      <div style="font-family: Arial, sans-serif; background: #fffbe6; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #ffe082;">
        <h2 style="color: #d4a200;">¡Gracias por tu interés en Mi Gusto!</h2>
        <p style="font-size: 1.1rem; color: #333;">Hola <b>${nombre}</b>,</p>
        <p style="font-size: 1.05rem; color: #333;">
          Hemos recibido tu solicitud para abrir una franquicia de Mi Gusto.<br/>
          Nuestro equipo analizará tu información y se pondrá en contacto contigo a la brevedad.<br/><br/>
          ¡Gracias por confiar en nosotros y querer ser parte de nuestra familia!
        </p>
        <hr style="margin: 24px 0; border: none; border-top: 1px solid #ffe082;"/>
        <p style="font-size: 0.98rem; color: #888;">Este es un mensaje automático, por favor no respondas a este correo.<br/>Equipo Mi Gusto</p>
      </div>
    `;
    await transporter.sendMail({
      from: 'development@migusto.com.ar',
      to: email,
      subject: '¡Gracias por tu interés en Mi Gusto Franquicias!',
      html: htmlFelicitacion,
    });

    // Suscribir a Mailchimp (audience ID franquicias)
    try {
      // Formatear fechaNacimiento a MM/DD para Mailchimp
      let birthdayMMDD = '';
      if (fechaNacimiento) {
        const partes = fechaNacimiento.split('/');
        if (partes.length >= 2) {
          // partes[1] = mes, partes[0] = día
          birthdayMMDD = `${partes[1].padStart(2, '0')}/${partes[0].padStart(2, '0')}`;
        }
      }
      await this.mailchimpClient.lists.addListMember(this.audienceIdFranquicias, {
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          FNAME: nombre || '',
          BIRTHDAY: birthdayMMDD,
          SEXO: sexo || '',
          ESTADOCIVIL: estadoCivil || '',
          DOCUMENTO: numeroDocumento || '',
          CELULAR: telefonoCelular || '',
        }
      });
    } catch (err) {
      // Si ya está suscripto u otro error, solo loguear
      console.error('Error suscribiendo a Mailchimp (franquicias):', err);
    }
  }
} 