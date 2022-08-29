import { Publisher, OrderCreatedEvent, Subjects } from "@dehui/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
