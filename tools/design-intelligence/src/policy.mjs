/** Safe, explicit local/staging-only design inspection boundaries. */
const MAX_PATHS = 40;
const MAX_WIDTH = 2560;
const LOCAL = new Set(['localhost', '127.0.0.1', '[::1]']);
const DISALLOWED = /(?:^|\/)(?:api|logout|delete|remove|destroy|cancel|pay|payment|checkout|export|download|trigger|webhook|cron|reset-password|unsubscribe)(?:\/|$|[-.])/i;

export function safeText(input, limit = 120) {
  return String(input ?? '').replace(/[\r\n\t]+/g, ' ').replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[email]').replace(/\b(?:Bearer\s+|sk-|ghp_)[A-Za-z0-9._-]{12,}\b/gi, '[redacted]').trim().slice(0, limit);
}

export function validatedOrigin(value) {
  const u = new URL(value);
  if (!['https:', 'http:'].includes(u.protocol) || u.username || u.password || u.search || u.hash || (u.pathname !== '/' && u.pathname !== '')) throw new Error('baseUrl must be an HTTP(S) origin without credentials or extra path');
  return u.origin;
}

export function isSafePath(raw) {
  if (typeof raw !== 'string' || !raw.startsWith('/') || raw.startsWith('//') || raw.includes('\\') || raw.includes('?') || raw.includes('#')) return false;
  let pathname;
  try { pathname = new URL(raw, 'https://fixture.invalid').pathname; } catch { return false; }
  if (pathname !== raw || /%2f|%5c|%00/i.test(raw) || DISALLOWED.test(raw)) return false;
  return !raw.split('/').some(s => s === '..' || s === '.');
}

export function validateConfig(config, env = process.env) {
  if (!config || typeof config !== 'object') throw new Error('A config object is required');
  const origin = validatedOrigin(config.baseUrl);
  if (!['local', 'staging'].includes(config.environment)) throw new Error('Only local or staging environments are allowed');
  const host = new URL(origin).hostname;
  if (config.environment === 'local' && !LOCAL.has(host)) throw new Error('Local targets must be loopback addresses');
  if (config.environment === 'staging' && new URL(origin).protocol !== 'https:') throw new Error('Staging requires HTTPS');
  if (!LOCAL.has(host) && env.DQ_APPROVED_ORIGIN !== origin) throw new Error('Set DQ_APPROVED_ORIGIN to the exact authorised staging origin');
  if (!Array.isArray(config.paths) || !config.paths.length || config.paths.length > MAX_PATHS || config.paths.some(p => !isSafePath(p))) throw new Error('Provide 1–40 safe, explicit paths; no queries or mutating routes');
  const maxPages = config.maxPages ?? 20;
  if (!Number.isInteger(maxPages) || maxPages < 1 || maxPages > MAX_PATHS || config.paths.length > maxPages) throw new Error('maxPages must cover the requested paths and be <= 40');
  const viewports = config.viewports ?? [{name:'desktop',width:1280,height:800},{name:'mobile',width:390,height:844}];
  if (!Array.isArray(viewports) || viewports.length < 1 || viewports.length > 5 || viewports.some(v=> !/^[a-z0-9-]{1,24}$/i.test(v?.name||'') || !Number.isInteger(v.width)|| v.width < 280 || v.width > MAX_WIDTH || !Number.isInteger(v.height)|| v.height < 320 || v.height > 2000)) throw new Error('1–5 viewports with valid width, height, names required');
  if (new Set(viewports.map(v=>v.name)).size !== viewports.length) throw new Error('Viewport names must be unique');
  if (config.screenshots && env.DQ_SCREENSHOTS !== '1') throw new Error('Screenshots require DQ_SCREENSHOTS=1 and approved synthetic/private data');
  if (config.outputDir && (typeof config.outputDir !== 'string' || config.outputDir.includes('\0'))) throw new Error('Invalid outputDir');
  return { origin, viewports, maxPages };
}

export function verifyFinalUrl(href, origin) {
  const u = new URL(href);
  if (u.origin !== origin || u.search || u.hash || !isSafePath(u.pathname)) throw new Error('Navigation left the exact authorised path/origin');
  return true;
}
