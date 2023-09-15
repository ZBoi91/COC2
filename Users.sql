-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Table Definition
CREATE TABLE "public"."Users" (
    "UserID" int4 NOT NULL,
    "Email" varchar,
    "Password" varchar,
    "Name" varchar DEFAULT 'NULL'::character varying,
    "Location" text,
    "role" varchar(20),
    PRIMARY KEY ("UserID")
);

INSERT INTO "public"."Users" ("UserID", "Email", "Password", "Name", "Location", "role") VALUES
(1, 'asad@gmail.com', '21323', 'ASAD', 'Bras Basah', NULL);
INSERT INTO "public"."Users" ("UserID", "Email", "Password", "Name", "Location", "role") VALUES
(2, 'chheyun@gmail.com', '32123', 'CY', 'Tanjong Katong', NULL);
INSERT INTO "public"."Users" ("UserID", "Email", "Password", "Name", "Location", "role") VALUES
(3, 'kaydw@gmail.com', '12345', 'Kay', 'Tanjong Rhu', NULL);
INSERT INTO "public"."Users" ("UserID", "Email", "Password", "Name", "Location", "role") VALUES
(4, 'jadepearl@gmail.com', 'beehooooooon', 'Bakaka', 'Jalan Simp', NULL),
(5, 'user@gmail.com', '$2b$12$raXPmQMmC8XtErb5aUdY3ehlX9kKRu/65cZJ3wrTPLK2/6sZRdT82', 'User', 'Canada', 'user'),
(6, 'admin@gmail.com', '$2b$12$6kbTVz54O7YVzav.mI1bJeV9dXLGPZWxrrJjz0OPUAm3PHlfMOxQy', 'Admin', 'USA', 'admin'),
(8, 'ouiouipeepee@gmail.com', '$2b$12$jaOBhA50.3gyG.FAdsDr1OpCW7HNnk87JOnMll43gcPaw5KAauhvS', 'CY', 'Bangcock', 'user'),
(9, 'oopp@gmail.com', '$2b$12$OXOdgHrviMOF3txNpuIoS.wKCBUT36GC6JLCJhwNzo1AUQfEJFFay', 'OOPPP', 'OOPPP', 'user'),
(10, 'admin2@gmail.com', '$2b$12$khLZo8yxh.z1Z4dJ3ApmK.uDu8zdPBUOu2VEXmnS0ppN6Lu5h4IrW', 'Admin2', 'InYourDreams', 'user'),
(11, 'admin3@gmail.com', '$2b$12$ZTk4CbrThqHP1hd84/m2Be7uSs3JkXQBaNCm.sNQVCjNi5/nBXT5y', 'Admin3', 'Adminland', 'user'),
(12, 'admin123@gmail.com', '$2b$12$xVxoT9NhrtN6uV9LorrTBO8groKwAanUdoh.EoDdwHQL6Rujzzze6', 'Admin', 'Nootnoot', 'admin'),
(13, 'admin5@gmail.com', '$2b$12$cD9ieZ8BnRiqneYVhZp0ZewiCF/J2k.bWsuBoj8QM/EEtvrUp2fGe', 'Admin5', 'Admin Land', 'user'),
(14, 'admin6@gmail.com', '$2b$12$fMc15IlniemUrnP1Bk8OpunkCzHJfA4mM3NBG0kkjg1nIgkSK6LJC', 'admin6', 'OOPPP', 'user'),
(15, '123@gmail.com', '$2b$12$jOnFarlZ1yzSliOQX2WCPuB.WJWV310a1Pq8u0SQJLpmGRnJifMHu', '12345678', 'Adminland', 'user');