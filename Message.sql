-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS message_id_sequence;

-- Table Definition
CREATE TABLE "public"."Message" (
    "MessageID" int4 DEFAULT nextval('message_id_sequence'::regclass),
    "ChatID" int4,
    "SenderID" int4,
    "MessageContent" varchar,
    "Timestamp" timestamp,
    CONSTRAINT "fk_message_chat_id" FOREIGN KEY ("ChatID") REFERENCES "public"."Users"("UserID"),
    CONSTRAINT "fk_message_sender_id" FOREIGN KEY ("SenderID") REFERENCES "public"."Users"("UserID")
);

INSERT INTO "public"."Message" ("MessageID", "ChatID", "SenderID", "MessageContent", "Timestamp") VALUES
(NULL, 13, 1, 'Your Charizard is nice, but abit expensive.', NULL);
INSERT INTO "public"."Message" ("MessageID", "ChatID", "SenderID", "MessageContent", "Timestamp") VALUES
(NULL, 13, 1, 'Can I get it for 30000?', NULL);
INSERT INTO "public"."Message" ("MessageID", "ChatID", "SenderID", "MessageContent", "Timestamp") VALUES
(NULL, 13, 13, 'cao ni ma', NULL);
INSERT INTO "public"."Message" ("MessageID", "ChatID", "SenderID", "MessageContent", "Timestamp") VALUES
(NULL, 13, 13, 'knnccb', NULL);