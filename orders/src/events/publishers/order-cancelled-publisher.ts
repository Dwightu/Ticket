import { Subjects, Publisher, OrderCancelledEvent } from "@dehui/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
