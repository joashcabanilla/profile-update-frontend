CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `members` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`memid` varchar(255),
	`pbno` varchar(255),
	`firstname` varchar(255) NOT NULL,
	`middlename` varchar(255),
	`lastname` varchar(255) NOT NULL,
	`birthdate` date NOT NULL,
	`branch` varchar(255) NOT NULL,
	`cpNumber` varchar(255),
	`email` varchar(255),
	`tinNumber` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `members_id` PRIMARY KEY(`id`),
	CONSTRAINT `members_cpNumber_unique` UNIQUE(`cpNumber`),
	CONSTRAINT `members_email_unique` UNIQUE(`email`),
	CONSTRAINT `members_tinNumber_unique` UNIQUE(`tinNumber`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(255),
	`emailVerified` timestamp(3),
	`image` varchar(255),
	`username` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`deleted_at` timestamp,
	`created_at` timestamp NOT NULL DEFAULT (now()),
	`updated_at` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `user_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;