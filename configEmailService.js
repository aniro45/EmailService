import { SESClient } from "@aws-sdk/client-ses";

let sesClient = null;

export function initializeEmailService() {
    const REGION = process.env.AWS_USER_REGION;
    const credentials = {
        accessKeyId: process.env.AWS_USER_ACCESS_KEY,
        secretAccessKey: process.env.AWS_USER_ACCESS_SECRET,
    };
    sesClient = new SESClient({ region: REGION, credentials: credentials });
}

export function getEmailInstance() {
    return sesClient;
}
