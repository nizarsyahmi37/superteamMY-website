import { pgTable, text, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const members = pgTable('members', {
	id: text('id').primaryKey(),
	photoUrl: text('photo_url').notNull(),
	name: text('name').notNull(),
	roleCompany: text('role_company').notNull(),
	skills: text('skills').notNull().default('[]'),
	xLink: text('x_link').notNull(),
	achievements: jsonb('achievements').notNull().default([]),
	createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type Member = typeof members.$inferSelect;
export type NewMember = typeof members.$inferInsert;
