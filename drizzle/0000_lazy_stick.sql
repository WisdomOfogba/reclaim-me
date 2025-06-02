CREATE TABLE "complaints" (
	"id" serial PRIMARY KEY NOT NULL,
	"fullname" varchar(200),
	"phone_number" varchar(20) NOT NULL,
	"email_address" varchar(100) NOT NULL,
	"address" varchar(255) NOT NULL,
	"scam_type" varchar(100),
	"incident_date" timestamp NOT NULL,
	"description" text NOT NULL,
	"amount_lost" numeric(15, 2),
	"currency" varchar(5),
	"payment_method" varchar(100),
	"scammer_info" json,
	"status" varchar(50) DEFAULT 'Under Review' NOT NULL,
	"user_id" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "report_statistics" (
	"id" serial PRIMARY KEY NOT NULL,
	"stat_name" text NOT NULL,
	"count_value" integer DEFAULT 0 NOT NULL,
	"last_updated" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "report_statistics_stat_name_unique" UNIQUE("stat_name")
);
--> statement-breakpoint
CREATE TABLE "tokens" (
	"id" serial PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"type" varchar(50) DEFAULT 'password_reset' NOT NULL,
	"expires_at" timestamp NOT NULL,
	"user_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tokens_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email_address" varchar(100) NOT NULL,
	"password" varchar(100) NOT NULL,
	"notification_enabled" boolean DEFAULT false NOT NULL,
	"is_2fa_enabled" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_address_unique" UNIQUE("email_address")
);
--> statement-breakpoint
ALTER TABLE "complaints" ADD CONSTRAINT "complaints_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tokens" ADD CONSTRAINT "tokens_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "complaints_name_index" ON "complaints" USING btree ("fullname");--> statement-breakpoint
CREATE INDEX "complaints_scam_type_index" ON "complaints" USING btree ("scam_type");--> statement-breakpoint
CREATE INDEX "complaints_status_index" ON "complaints" USING btree ("status");--> statement-breakpoint
CREATE INDEX "users_email_index" ON "users" USING btree ("email_address");