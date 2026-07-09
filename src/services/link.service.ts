import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db } from '../db';
import { smartLinks } from '../db/schema';

export async function getLinkBySlug(slug: string) {
  return db.query.smartLinks.findFirst({
    where: eq(smartLinks.slug, slug),
  });
}

export async function createSmartLink(data: {
  title: string;
  androidUrl: string;
  iosUrl: string;
  websiteUrl?: string;
  fallbackUrl?: string;
  userId?: number;
}) {
  const slug = nanoid(6); // e.g., 'V1StGXR8_Z5jdHi6B-myT'
  
  const [link] = await db.insert(smartLinks).values({
    ...data,
    slug,
  }).returning();

  return link;
}
