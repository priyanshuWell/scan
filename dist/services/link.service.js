import { eq } from 'drizzle-orm';
import { nanoid } from 'nanoid';
import { db } from '../db/index.js';
import { smartLinks } from '../db/schema.js';
export async function getLinkBySlug(slug) {
    return db.query.smartLinks.findFirst({
        where: eq(smartLinks.slug, slug),
    });
}
export async function createSmartLink(data) {
    const slug = nanoid(6); // e.g., 'V1StGXR8_Z5jdHi6B-myT'
    const [link] = await db.insert(smartLinks).values({
        ...data,
        slug,
    }).returning();
    return link;
}
