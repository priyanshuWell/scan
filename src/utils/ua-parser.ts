import { UAParser } from 'ua-parser-js';

export function detectDevice(userAgent: string): 'android' | 'ios' | 'desktop' {
  const parser = new UAParser(userAgent);
  const os = parser.getOS();

  if (os.name === 'Android') return 'android';
  if (os.name === 'iOS' || os.name === 'Mac OS') {
    const device = parser.getDevice();
    if (device.type === 'mobile' || os.name === 'iOS') return 'ios';
  }
  return 'desktop';
}

export function getBrowserAndOS(userAgent: string) {
  const parser = new UAParser(userAgent);
  return {
    browser: parser.getBrowser().name || 'Unknown',
    os: parser.getOS().name || 'Unknown',
  };
}
