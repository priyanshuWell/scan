CREATE TABLE "scans" (
	"id" serial PRIMARY KEY NOT NULL,
	"smart_link_id" integer NOT NULL,
	"device" text,
	"browser" text,
	"os" text,
	"country" text,
	"city" text,
	"ip_hash" text,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "smart_links" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"android_url" text NOT NULL,
	"ios_url" text NOT NULL,
	"website_url" text,
	"fallback_url" text,
	"style_config" jsonb,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "smart_links_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "scans" ADD CONSTRAINT "scans_smart_link_id_smart_links_id_fk" FOREIGN KEY ("smart_link_id") REFERENCES "public"."smart_links"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "smart_links" ADD CONSTRAINT "smart_links_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;