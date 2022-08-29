import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@dehui/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
