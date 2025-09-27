export enum Errors {
  // HTTP
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  NotFound = 'NOT_FOUND',
  Unauthorized = 'UNAUTHORIZED',
  BadRequest = 'BAD_REQUEST',
  Forbidden = 'FORBIDDEN',
  // Chat
  MissingOrInvalidConversationID = 'MISSING_OR_INVALID_CONVERSATION_ID',
  ConversationNotFound = 'CONVERSATION_NOT_FOUND',
  ChatConversationClosed = 'CHAT_CONVERSATION_CLOSED',
  ChatParticipantNoLongerAvailable = 'CHAT_PARTICIPANT_NO_LONGER_AVAILABLE',
}
