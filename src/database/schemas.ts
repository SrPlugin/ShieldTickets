import { boolean, integer, jsonb, pgTable, text, timestamp, uuid, index, uniqueIndex } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId").notNull().unique(),
    openTickets: integer("openTickets").notNull().default(0),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
    userIdIdx: uniqueIndex("user_id_idx").on(table.userId),
}));

export const tickets = pgTable("tickets", {
    id: uuid("id").primaryKey().defaultRandom(),
    ticketId: integer("ticketId").notNull(),
    ticketName: text("ticketName").notNull(),
    ownerId: text("ownerId").notNull().references(() => users.userId),
    ownerTag: text("ownerTag").notNull(),
    isClosed: boolean("isClosed").notNull().default(false),
    closedById: text("closedById"),
    closedByTag: text("closedByTag"),
    closedAt: timestamp("closedAt"),
    category: text("category").notNull(),
    isClaimed: boolean("isClaimed").notNull().default(false),
    claimedById: text("claimedById"),
    claimedByTag: text("claimedByTag"),
    users: jsonb("users").notNull().default([]),
    messagesCount: integer("messagesCount").notNull().default(0),
    channelId: text("channelId").notNull().unique(),
    transcriptUrl: text("transcriptUrl"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
    channelIdIdx: uniqueIndex("channel_id_idx").on(table.channelId),
    ownerIdIdx: index("owner_id_idx").on(table.ownerId),
    ticketIdIdx: index("ticket_number_idx").on(table.ticketId),
}));

export const ticketsCount = pgTable("ticketsCount", {
    id: uuid("id").primaryKey().defaultRandom(),
    count: integer("count").notNull().default(0),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

export const stats = pgTable("stats", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId").notNull().references(() => users.userId),
    claimedTickets: integer("claimedTickets").notNull().default(0),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
    statsUserIdIdx: uniqueIndex("stats_user_id_idx").on(table.userId),
}));

export const blacklist = pgTable("blacklist", {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: text("userId").notNull().unique(),
    reason: text("reason").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
    blacklistUserIdIdx: uniqueIndex("blacklist_user_id_idx").on(table.userId),
}));

export const inactiveTickets = pgTable("inactiveTickets", {
    id: uuid("id").primaryKey().defaultRandom(),
    channelId: text("channelId").notNull().references(() => tickets.channelId),
    timestamp: timestamp("timestamp").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
    inactiveChannelIdx: index("inactive_channel_idx").on(table.channelId),
}));

export const qualifications = pgTable("qualifications", {
    id: uuid("id").primaryKey().defaultRandom(),
    ticketId: uuid("ticketId").notNull().references(() => tickets.id),
    claimedBy: text("claimedBy").notNull(),
    qualificationMessageId: text("qualificationMessageId").notNull(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
    qualMsgIdx: uniqueIndex("qual_msg_id_idx").on(table.qualificationMessageId),
}));

export const qualified_tickets = pgTable("qualifiedTickets", {
    id: uuid("id").primaryKey().defaultRandom(),
    ticketId: uuid("ticketId").notNull().references(() => tickets.id),
    claimedBy: text("claimedBy").notNull(),
    stars: integer("stars").notNull().default(0),
    comment: text("comment").default(""),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow(),
}, (table) => ({
    qualTicketIdx: index("qual_ticket_id_idx").on(table.ticketId),
    starsIdx: index("stars_idx").on(table.stars),
}));