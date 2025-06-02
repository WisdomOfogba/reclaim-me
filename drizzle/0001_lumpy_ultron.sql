ALTER TABLE "complaints" ALTER COLUMN "fullname" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "complaints" ALTER COLUMN "scam_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "complaints" ALTER COLUMN "incident_date" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "complaints" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "complaints" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "complaints" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "complaints" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "report_statistics" ALTER COLUMN "last_updated" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "report_statistics" ALTER COLUMN "last_updated" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "expires_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "tokens" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DATA TYPE timestamp with time zone;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "complaints" ADD COLUMN "ai_consoling_message" text;--> statement-breakpoint
ALTER TABLE "complaints" ADD COLUMN "ai_police_report_draft" text;--> statement-breakpoint
ALTER TABLE "complaints" ADD COLUMN "ai_bank_complaint_email" text;--> statement-breakpoint
ALTER TABLE "complaints" ADD COLUMN "ai_next_steps_checklist" text;--> statement-breakpoint
CREATE INDEX "complaints_email_index" ON "complaints" USING btree ("email_address");