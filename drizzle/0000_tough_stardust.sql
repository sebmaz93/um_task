-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE "groups" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"status" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE "user_groups" (
	"user_id" integer NOT NULL,
	"group_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
*/