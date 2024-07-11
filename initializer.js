import { GlobalErrorHandler } from "./globalErrorHandler.js";
import { MessageQueue } from "./MessageQueue.js";
import { initializeEmailService } from "./configEmailService.js";
import { ConsumerMethodHandler } from "./ConsumerMethodHandler.js";

class Initializer {
    async init() {
        this.initiateGlobalErrorHandler();
        initializeEmailService();
        await this.initiateMessageQueue();
        this.initiateConsumerMethodHandler();
    }

    initiateGlobalErrorHandler() {
        return new GlobalErrorHandler();
    }

    async initiateMessageQueue() {
        if (!MessageQueue.connection) {
            return await new MessageQueue().initiateMessageQueue();
        }
    }

    initiateConsumerMethodHandler() {
        new ConsumerMethodHandler().setEventsInConsumer();
    }
}

export default Initializer;
