CREATE TABLE `members` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`memid` varchar(255),
	`pbno` varchar(255),
	`firstname` varchar(255) NOT NULL,
	`middlename` varchar(255),
	`lastname` varchar(255) NOT NULL,
	`birthdate` date,
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
