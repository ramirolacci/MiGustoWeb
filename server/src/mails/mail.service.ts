import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as mandrill from 'mandrill-api/mandrill';
import * as mailchimp from '@mailchimp/mailchimp_marketing';

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
} 