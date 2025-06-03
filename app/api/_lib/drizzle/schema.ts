import {
  boolean,
  // date, // No longer used directly here, replaced by timestamp
  index,
  integer,
  json,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    email: varchar("email_address", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 100 }).notNull(), // Ensure this is securely hashed
    isNotifEnabled: boolean("notification_enabled").default(false).notNull(),
    is2FAEnabled: boolean("is_2fa_enabled").notNull().default(false),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    emailIndex: index("users_email_index").on(table.email),
  })
);

// Complaints table
export const complaints = pgTable(
  "complaints",
  {
    id: serial("id").primaryKey(),
    // User-provided information
    name: varchar("fullname", { length: 200 }).notNull(),
    phone: varchar("phone_number", { length: 20 }).notNull(),
    email: varchar("email_address", { length: 100 }).notNull(),
    address: varchar("address", { length: 255 }).notNull(),
    scamType: varchar("scam_type", { length: 100 }).notNull(),
    incidentDate: timestamp("incident_date", {
      mode: "string",
      withTimezone: true,
    }).notNull(), // Store as ISO string
    description: text("description").notNull(),
    amountLost: numeric("amount_lost", { precision: 15, scale: 2 }),
    currency: varchar("currency", { length: 5 }),
    paymentMethod: varchar("payment_method", { length: 100 }),
    scammerInfo: json("scammer_info").$type<{
      name?: string | null;
      bank?: string | null;
      account?: string | null;
    }>(),

    // AI-generated content (new fields)
    aiConsolingMessage: text("ai_consoling_message"),
    aiPoliceReportDraft: text("ai_police_report_draft"),
    aiBankComplaintEmail: text("ai_bank_complaint_email"),
    aiNextStepsChecklist: text("ai_next_steps_checklist"), // Store the raw (joined) string

    // Metadata and status
    status: varchar("status", { length: 50 }).default("Under Review").notNull(),
    userId: integer("user_id").references(() => users.id, {
      onDelete: "cascade",
    }),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { mode: "date", withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    complaintNameIndex: index("complaints_name_index").on(table.name),
    scamTypeIndex: index("complaints_scam_type_index").on(table.scamType),
    statusIndex: index("complaints_status_index").on(table.status),
    emailIndex: index("complaints_email_index").on(table.email), // Added index on email for faster lookups
  })
);

// Tokens table
export const tokenTable = pgTable("tokens", {
  id: serial("id").primaryKey(),
  token: text("token").notNull().unique(),
  type: varchar("type", { length: 50 }).notNull().default("password_reset"),
  expiresAt: timestamp("expires_at", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
});

// ReportStatistics table (optional, if you want to store some stats explicitly)
export const reportStatistics = pgTable("report_statistics", {
  id: serial("id").primaryKey(),
  statName: text("stat_name").notNull().unique(),
  countValue: integer("count_value").notNull().default(0),
  lastUpdated: timestamp("last_updated", { mode: "date", withTimezone: true })
    .defaultNow()
    .notNull(),
});
