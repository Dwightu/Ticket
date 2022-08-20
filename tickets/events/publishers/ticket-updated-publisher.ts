import { Publisher, Subjects, TicketUpdatedEvent } from "@dehui/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
