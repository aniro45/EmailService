import { connect } from "amqplib";

export class MessageQueue {
    static connection = null;

    async initiateMessageQueue() {
        try {
            const {
                RABBIT_MQ_HOST,
                RABBIT_MQ_PORT,
                RABBIT_MQ_USERNAME,
                RABBIT_MQ_PASSWORD,
            } = process.env;
            const url = `amqps://${RABBIT_MQ_USERNAME}:${RABBIT_MQ_PASSWORD}@${RABBIT_MQ_HOST}:${RABBIT_MQ_PORT}/`;
            MessageQueue.connection = await connect(url);
        } catch (error) {
            console.error(error);
        }
    }

    static async publish(queue, message) {
        if (!MessageQueue.connection) {
            console.log("connection does not exists!");
            return;
        }
        const channel = await MessageQueue.connection.createChannel();

        await channel.assertQueue(queue, { durable: false });
        await channel.sendToQueue(queue, Buffer.from(message));

        console.log(` [x] Sent ${message}`);
    }

    static async consume(queue, callback) {
        if (!MessageQueue.connection) {
            console.log("connection does not exists!");
            return;
        }

        const channel = await MessageQueue.connection.createChannel();

        await channel.assertQueue(queue, { durable: false });
        console.log(
            ` [*] Waiting for messages in ${queue}. To exit press CTRL+C`,
        );

        channel.consume(
            queue,
            (msg) => {
                try {
                    const stringifiedMessage = msg.content.toString();
                    const parsedMessage = JSON.parse(stringifiedMessage);
                    callback(parsedMessage);
                } catch (error) {
                    console.log("Error", error);
                }
            },
            { noAck: true },
        );
    }
}
