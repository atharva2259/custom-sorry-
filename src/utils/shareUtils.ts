import { ApologySite } from '../types/builder';

/**
 * Encodes site state safely into a base64 string for URL hash sharing
 */
export function encodeSiteToHash(site: ApologySite): string {
  try {
    const jsonStr = JSON.stringify(site);
    const encoded = btoa(encodeURIComponent(jsonStr));
    return encoded;
  } catch (e) {
    console.error('Failed to encode site:', e);
    return '';
  }
}

/**
 * Decodes site state from base64 string
 */
export function decodeSiteFromHash(hashStr: string): ApologySite | null {
  try {
    // Strip leading # if present
    const cleanHash = hashStr.startsWith('#') ? hashStr.slice(1) : hashStr;
    const params = new URLSearchParams(cleanHash);
    const encoded = params.get('site') || cleanHash;

    if (!encoded) return null;
    const decodedJson = decodeURIComponent(atob(encoded));
    const site = JSON.parse(decodedJson) as ApologySite;
    return site;
  } catch (e) {
    console.error('Failed to decode site from hash:', e);
    return null;
  }
}

/**
 * Generates a full shareable URL
 */
export function getShareableUrl(site: ApologySite): string {
  const hash = encodeSiteToHash(site);
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}#site=${hash}`;
}

/**
 * Creates mailto link with personalized apology invitation
 */
export function generateMailtoLink(
  recipientEmail: string,
  recipientName: string,
  apologizerName: string,
  shareUrl: string,
  customSubject?: string
): string {
  const subject = customSubject || `An honest apology from the bottom of my heart, ${recipientName} 💌`;
  const body = `My Dearest ${recipientName},

I am writing this because you mean everything to me, and I owe you a sincere apology. What happened recently was my mistake, and I am deeply sorry for causing you any hurt or disappointment.

I built a dedicated, private apology letter and promise bond for you to read:
${shareUrl}

Inside you will find:
• My handwritten letter & honest reflections
• An official Solemn Reconciliation Bond guaranteeing this mistake will never happen again (with digital signatures)
• Reconciliation vouchers redeemable whenever you wish
• A space where you can share your honest feelings

Please take all the time you need. I will always cherish and respect you.

Forever yours,
${apologizerName}`;

  return `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
