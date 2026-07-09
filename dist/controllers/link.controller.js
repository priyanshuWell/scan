import { createSmartLink } from '../services/link.service.js';
export async function createLink(req, res) {
    try {
        // Validation will be added in Phase 2 with Zod
        const { title, androidUrl, iosUrl, websiteUrl, fallbackUrl } = req.body;
        if (!title || !androidUrl || !iosUrl) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const link = await createSmartLink({ title, androidUrl, iosUrl, websiteUrl, fallbackUrl });
        res.status(201).json({
            ...link,
            smartUrl: `${process.env.BASE_URL}/${link.slug}`,
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
