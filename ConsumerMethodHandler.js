import { MessageQueue } from "./MessageQueue.js";
import { ConsumerQueueNames } from "./constants.js";
import { TestMail } from "./emailController.js";

export class ConsumerMethodHandler {
    setEventsInConsumer() {
        const { SEND_EMAIL } = ConsumerQueueNames;
        MessageQueue.consume(SEND_EMAIL, TestMail);
    }
}
