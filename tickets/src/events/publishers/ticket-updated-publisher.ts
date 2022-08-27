import { Publisher, Subjects, TicketUpdatedEvent } from "@dehui/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
