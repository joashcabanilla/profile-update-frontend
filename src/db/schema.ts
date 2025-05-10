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
