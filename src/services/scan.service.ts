import { db } from '../db';
import { scans } from '../db/schema';
import { detectDevice, getBrowserAndOS } from '../utils/ua-parser';
import { createHash } from 'crypto';

// Stub for geo-location (will integrate MaxMind or IP-API in Phase 4)
async function getGeoLocation(ip: string) {
  return { country: 'Unknown', city: 'Unknown' };
}

export async function logScanAndRedirect(slugData: { id: number }, userAgent: string, ip: string) {
  const device = detectDevice(userAgent);
  const { browser, os } = getBrowserAndOS(userAgent);
  const { country, city } = await getGeoLocation(ip);
  
  // Hash IP for privacy before storing
  const ipHash = createHash('sha256').update(ip + process.env.IP_SALT!).digest('hex');

  await db.insert(scans).values({
    smartLinkId: slugData.id,
    device,
    browser,
    os,
    country,
    city,
    ipHash,
  });

  return device;
}
