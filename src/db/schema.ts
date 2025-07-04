import { date, mysqlTable, bigint, varchar, timestamp, int, primaryKey } from "drizzle-orm/mysql-core";
import type { AdapterAccountType } from "next-auth/adapters";

export const membersTable = mysqlTable("members", {
    id: bigint("id", { mode: "bigint" }).autoincrement().primaryKey(),
    memid: varchar("memid", { length: 255 }),
    pbno: varchar("pbno", { length: 255 }),
    firstname: varchar("firstname", { length: 255 }).notNull(),
    middlename: varchar("middlename", { length: 255 }),
    lastname: varchar("lastname", { length: 255 }).notNull(),
    birthdate: date("birthdate").notNull(),
    branch: varchar("branch", { length: 255 }).notNull(),
    cpNumber: varchar("cpNumber", { length: 255 }).unique(),
    email: varchar("email", { length: 255 }).unique(),
    tinNumber: varchar("tinNumber", { length: 255 }).unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
});

export const users = mysqlTable("user", {
    id: varchar("id", { length: 255 })
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    name: varchar("name", { length: 255 }),
    email: varchar("email", { length: 255 }).unique(),
    emailVerified: timestamp("emailVerified", {
        mode: "date",
        fsp: 3
    }),
    image: varchar("image", { length: 255 }),
    username: varchar("username", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
});

export const accounts = mysqlTable(
    "account",
    {
        userId: varchar("userId", { length: 255 })
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        type: varchar("type", { length: 255 }).$type<AdapterAccountType>().notNull(),
        provider: varchar("provider", { length: 255 }).notNull(),
        providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
        refresh_token: varchar("refresh_token", { length: 255 }),
        access_token: varchar("access_token", { length: 255 }),
        expires_at: int("expires_at"),
        token_type: varchar("token_type", { length: 255 }),
        scope: varchar("scope", { length: 255 }),
        id_token: varchar("id_token", { length: 2048 }),
        session_state: varchar("session_state", { length: 255 })
    },
    (table) => [primaryKey({ columns: [table.provider, table.providerAccountId] })]
);
