import {
    date,
    mysqlTable,
    bigint,
    varchar,
    timestamp
} from "drizzle-orm/mysql-core";

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

export const usersTable = mysqlTable("users", {
    id: bigint("id", { mode: "bigint" }).autoincrement().primaryKey(),
    name: varchar("name", { length: 255 }),
    username: varchar("username", { length: 255 }),
    password: varchar("password", { length: 255 }),
    deletedAt: timestamp("deleted_at"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull()
});
