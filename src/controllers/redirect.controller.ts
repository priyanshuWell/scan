import { Request, Response } from 'express';
import { getLinkBySlug } from '../services/link.service';
import { logScanAndRedirect } from '../services/scan.service';

export async function handleSmartRedirect(req: Request, res: Response) {
  const { slug } = req.params;
  const link = await getLinkBySlug(slug);

  if (!link) {
    return res.status(404).send('Link not found');
  }

  // Get IP (handle proxies)
  const ip = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown';
  const userAgent = req.headers['user-agent'] || '';

  const device = await logScanAndRedirect(link, userAgent, ip);

  if (device === 'android') {
    return res.redirect(link.androidUrl);
  }

  if (device === 'ios') {
    return res.redirect(link.iosUrl);
  }

  // Desktop: Render a basic download page (will be styled beautifully in Phase 4)
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head><title>Download ${link.title}</title></head>
    <body style="font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f3f4f6;">
      <div style="text-align: center; padding: 2rem; background: white; border-radius: 1rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h1>${link.title}</h1>
        <div style="margin-top: 2rem; display: flex; gap: 1rem; justify-content: center;">
          <a href="${link.androidUrl}" style="padding: 1rem 2rem; background: #000; color: #fff; text-decoration: none; border-radius: 0.5rem;">Download for Android</a>
          <a href="${link.iosUrl}" style="padding: 1rem 2rem; background: #007AFF; color: #fff; text-decoration: none; border-radius: 0.5rem;">Download for iOS</a>
          ${link.websiteUrl ? `<a href="${link.websiteUrl}" style="padding: 1rem 2rem; background: #ccc; color: #000; text-decoration: none; border-radius: 0.5rem; margin-top: 1rem; display: block;">Visit Website</a>` : ''}
        </div>
      </div>
    </body>
    </html>
  `);
}
