import { Subjects, Publisher, PaymentCreatedEvent } from "@dehui/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
