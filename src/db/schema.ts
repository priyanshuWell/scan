import { pgTable, text, timestamp, integer, jsonb, serial } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    passwordHash: text('password_hash').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
});
export const smartLinks = pgTable('smart_links', {
  id: serial('id').primaryKey(),
  // ADD .default(null) or just remove notNull() - Drizzle treats it as nullable
  userId: integer('user_id').references(() => users.id), 
  title: text('title').notNull(),
  slug: text('slug').notNull().unique(),
  androidUrl: text('android_url').notNull(),
  iosUrl: text('ios_url').notNull(),
  websiteUrl: text('website_url'),
  fallbackUrl: text('fallback_url'),
  styleConfig: jsonb('style_config').$type<{
    fgColor: string;
    bgColor: string;
  }>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});
export const scans = pgTable('scans', {
    id: serial('id').primaryKey(),
    smartLinkId: integer('smart_link_id').references(() => smartLinks.id).notNull(),
    device: text('device'), // 'android', 'ios', 'desktop'
    browser: text('browser'),
    os: text('os'),
    country: text('country'),
    city: text('city'),
    ipHash: text('ip_hash'),
    timestamp: timestamp('timestamp').defaultNow().notNull(),
});