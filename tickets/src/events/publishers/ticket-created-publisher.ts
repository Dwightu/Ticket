import { Publisher, Subjects, TicketCreatedEvent } from "@dehui/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
