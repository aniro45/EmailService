export function getEmailPayloadForSendCommand({
    to,
    from,
    subject,
    text,
    html,
}) {
    return {
        Destination: {
            ToAddresses: [to],
        },
        Message: {
            Body: {
                Html: { Data: html },
            },
            Subject: { Data: subject },
        },
        Source: from,
    };
}
