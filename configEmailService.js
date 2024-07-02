//SendGrid
import sgMail from '@sendgrid/mail'

export function initializeEmailService() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export function getEmailInstance() {
    return sgMail;
    
}



