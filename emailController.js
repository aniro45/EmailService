import { getEmailInstance } from "./configEmailService.js";
import { SendEmailCommand } from "@aws-sdk/client-ses";
import { getEmailPayloadForSendCommand } from "./utils.js";

export async function sendEmail(req, res, next) {
    const { to, from, subject, text, html } = req.body;

    const payload = getEmailPayloadForSendCommand({
        to,
        from,
        subject,
        text,
        html,
    });

    try {
        const sendEmailCommand = new SendEmailCommand(payload);
        const data = await getEmailInstance().send(sendEmailCommand);
        res.status(201).json({
            status: "SUCCESS",
            message: "Email has been sent!",
            data: data,
        });
    } catch (error) {
        res.status(201).json({
            status: "FAILED",
            message: "Problem while sending the mail.",
            error: error,
        });
    }
}

export function verifyAPIKey(req, res, next) {
    try {
        const key = req.query.key;
        if (key === process.env.SERVICE_API_KEY) {
            next();
        } else {
            res.status(401).json({
                status: "FAILED",
                message: "API key could not verify",
            });
        }
    } catch (error) {
        res.status(401).json({
            status: "FAILED",
            message: "problem while verifying the API key for email service",
            error: error,
        });
    }
}
