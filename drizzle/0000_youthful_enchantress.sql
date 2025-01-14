CREATE TABLE `creditors` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`address` text NOT NULL,
	`phone` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`creditor_id` integer NOT NULL,
	`created_at` text NOT NULL,
	`transaction_date` text NOT NULL,
	`type` integer DEFAULT 1 NOT NULL,
	`item` text NOT NULL,
	`amount` integer NOT NULL,
	FOREIGN KEY (`creditor_id`) REFERENCES `creditors`(`id`) ON UPDATE no action ON DELETE no action
);
