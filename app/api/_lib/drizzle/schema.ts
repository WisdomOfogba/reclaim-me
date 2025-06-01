import {
  boolean,
  date,
  integer,
  json,
  numeric,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";


// TODO: Rememeber to add auth in case of various users
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email_address", { length: 100 }).notNull().unique(),
  password: varchar("password", { length: 100 }),
  isNotifEnabled: boolean("notification_enabled").default(false),
});

export const complaints = pgTable("complaints", {
  id: serial("id").primaryKey(),
  name: varchar("fullname", { length: 200 }),
  phone: varchar("phone_number", { length: 20 }).notNull(),
  email: varchar("email_address", { length: 100 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  type: varchar("scam_type", { length: 100 }),
  dateTime: date("date", { mode: "date" }).notNull(),
  description: text("description").notNull(),
  amount: numeric("amount", { mode: "number", precision: 15, scale: 2 }),
  currency: varchar("currency", { length: 5 }),
  paymentMethod: varchar("payment_method", { length: 100 }),
  scammerInfo: json("scammer_info").$type<{
    name: string;
    bank: string;
    account: string;
  }>(),
  userId: integer("user_id").references(() => users.id, {
    onDelete: "cascade",
  }),
});

/** For storing reset link tokens */
export const tokenTable = pgTable("tokens", {
  token: text("token").notNull(),
  expDate: date("exp_date", { mode: "date" }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});