/** Safe, side-effect-conscious URL and action policy for the Website QA Auditor. */
export const DEFAULT_BLOCKED_PATH_PARTS = [
  '/api/', '/logout', '/log-out', '/signout', '/sign-out', '/delete',
  '/remove', '/unsubscribe', '/cancel', '/checkout', '/pay-now', '/charge-now',
  '/refund', '/webhook', '/trigger', '/execute', '/send-email', '/send-sms',
  '/download', '/export', '/admin/actions',
];

export const HIGH_RISK_ACTION = /\b(delete|remove|refund|pay|charge|purchase|buy|cancel|send|email|sms|finish|complete|publish|submit|confirm|activate|deactivate|approve|transfer|invite|save|update|create|add)\b/i;

export function safeText(value, limit = 110) {
  return String(value ?? '')
    .replace(/[\w.+-]+@[\w.-]+\.[a-zA-Z]{2,}/g, '[email]')
    .replace(/\b(?:\+?\d[\d\s()-]{7,}\d)\b/g, '[number]')
    .replace(/(bearer\s+)[a-z\d._~-]+/ig, '$1[redacted]')
    .replace(/(?:sk-|ghp_)[a-z0-9_-]{12,}/ig, '[secret]')
    .replace(/\s+/g, ' ')
    .trim().slice(0, limit);
}

export function originFrom(input) {
  const url = new URL(input);
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) {
    throw new Error('Use an HTTP(S) URL without embedded credentials.');
  }
  return url.origin;
}

export function pathAllowed(path, prefixes) {
  return prefixes.some((prefix) => {
    const p = prefix.endsWith('/') && prefix !== '/' ? prefix.slice(0, -1) : prefix;
    return p === '/' || path === p || path.startsWith(`${p}/`);
  });
}

export function isSafeNavigation(href, baseUrl, config = {}) {
  let url;
  try { url = new URL(href, baseUrl); } catch { return false; }
  if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password) return false;
  if (url.origin !== originFrom(baseUrl)) return false;
  const path = url.pathname.toLowerCase();
  if (path === '/api' || path.endsWith('/logout') || path.endsWith('/signout')) return false;
  if (DEFAULT_BLOCKED_PATH_PARTS.some((part) => path.includes(part))) return false;
  if ((config.blockPaths || []).some((part) => path.includes(String(part).toLowerCase()))) return false;
  if (/\.(?:pdf|csv|zip|exe|png|jpe?g|gif|svg|webp|ico|mp4|mov|woff2?|ttf|eot|css|js|json|xml|txt)$/i.test(path)) return false;
  const allowed = config.allowedPathPrefixes || ['/'];
  if (!Array.isArray(allowed) || allowed.length === 0 || !pathAllowed(url.pathname, allowed)) return false;
  // Deliberately skip query-bearing URLs to avoid exercising stateful GET endpoints
  // and accidentally recording tokens/PII. Only bare paths are crawled.
  if (url.search) return false;
  return true;
}

export function canonicalRoute(href, baseUrl) {
  const url = new URL(href, baseUrl);
  return `${url.origin}${url.pathname}`;
}

export function validateConfig(config) {
  if (!config || typeof config !== 'object' || !config.baseUrl) throw new Error('config.baseUrl is required.');
  originFrom(config.baseUrl);
  if (!['staging', 'local', 'production-readonly'].includes(config.environment)) {
    throw new Error('Set environment to local, staging or production-readonly.');
  }
  if (!Array.isArray(config.startPaths) || config.startPaths.length === 0) {
    throw new Error('Provide at least one startPaths entry.');
  }
  if (!Array.isArray(config.allowedPathPrefixes) || config.allowedPathPrefixes.length === 0) {
    throw new Error('Provide nonempty allowedPathPrefixes.');
  }
  const maxPages = Number(config.maxPages ?? 30);
  const maxDepth = Number(config.maxDepth ?? 2);
  if (!Number.isInteger(maxPages) || maxPages < 1 || maxPages > 250) throw new Error('maxPages must be 1..250.');
  if (!Number.isInteger(maxDepth) || maxDepth < 0 || maxDepth > 10) throw new Error('maxDepth must be 0..10.');
  if (!config.startPaths.every((v) => isSafeNavigation(v, config.baseUrl, config))) {
    throw new Error('startPaths must be safe, same-origin, allowlisted paths without query strings.');
  }
  return { maxPages, maxDepth };
}

export function assertMutationAllowed(config, env = process.env) {
  if (!['staging', 'local'].includes(config.environment)) {
    throw new Error('Workflow interactions are forbidden on production-readonly environments.');
  }
  if (env.QA_ALLOW_MUTATIONS !== '1') {
    throw new Error('Workflow actions are opt-in: set QA_ALLOW_MUTATIONS=1.');
  }
  if (env.QA_APPROVED_ORIGIN !== originFrom(config.baseUrl)) {
    throw new Error('Set QA_APPROVED_ORIGIN to the exact staging/local origin to approve interactions.');
  }
  return true;
}

export function assertStepAllowed(step, config, env = process.env) {
  if (['click', 'fill', 'select'].includes(step.action)) assertMutationAllowed(config, env);
  const actionLabel = `${step.name ?? ''} ${step.selector ?? ''} ${step.role ?? ''}`;
  if (step.action === 'click' && HIGH_RISK_ACTION.test(actionLabel) && env.QA_ALLOW_HIGH_RISK !== '1') {
    throw new Error('Potentially state-changing action requires QA_ALLOW_HIGH_RISK=1 on approved staging/local environment.');
  }
}
