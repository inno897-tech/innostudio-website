// Cloudflare Pages Function: POST /api/contact
// Sends the "Start a project" form to info@innostudio.net through Brevo.
// Needs the secret BREVO_API_KEY in Cloudflare Pages → innostudio-site → Settings → Variables and Secrets.
// Sender: info@ruskanordic.com is already authenticated in Brevo. Once innostudio.net is
// authenticated in Brevo too, change SENDER to 'info@innostudio.net'.

const TO = 'info@innostudio.net';
const SENDER = 'info@ruskanordic.com';
const NEEDS = { brand: 'Brand design', uiux: 'UI/UX design', loc: 'Localization', unsure: 'Not sure yet' };

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });
const clean = (v, max) =>
  String(v ?? '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function onRequestPost({ request, env }) {
  if (!env.BREVO_API_KEY) return json(500, { error: 'not-configured' });

  const origin = request.headers.get('origin') || '';
  if (origin && !/^https:\/\/([a-z0-9-]+\.)*(innostudio\.net|innostudio-site\.pages\.dev)$/.test(origin)) {
    return json(403, { error: 'origin' });
  }

  let data;
  try { data = await request.json(); } catch { return json(400, { error: 'format' }); }

  // Spam traps: a hidden field people never fill, and a minimum time with the form open.
  if (clean(data.website, 200)) return json(200, { ok: true });
  if (!(Number(data.elapsed || 0) >= 3000)) return json(400, { error: 'too-fast' });

  const name = clean(data.name, 120);
  const email = clean(data.email, 200);
  const company = clean(data.company, 160);
  const need = NEEDS[clean(data.need, 20)];
  const message = clean(data.message, 5000);
  const lang = clean(data.lang, 5) === 'fi' ? 'Finnish' : 'English';

  if (!name || !message || !need) return json(400, { error: 'missing' });
  if (!/^[^\s@<>()",;]+@[^\s@<>()",;]+\.[^\s@<>()",;]+$/.test(email)) return json(400, { error: 'email' });

  const subject = `New project: ${need} — ${company || name}`.replace(/[\r\n]+/g, ' ');
  const rows = [['Name', name], ['Email', email], ['Company', company || '—'], ['Needs', need], ['Site language', lang]];
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#111;line-height:1.5">
<p style="margin:0 0 16px;color:#555">New message from the innostudio.net project form. Reply to this email to answer ${esc(name)} directly.</p>
<table cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 20px">${rows
    .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;color:#555;vertical-align:top">${k}</td><td style="padding:4px 0">${esc(v)}</td></tr>`)
    .join('')}</table>
<div style="border-top:1px solid #ccc;padding-top:16px;white-space:pre-wrap">${esc(message)}</div>
</div>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${message}`;

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: { 'api-key': env.BREVO_API_KEY, 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({
      sender: { name: 'INNO Design Studio website', email: SENDER },
      to: [{ email: TO, name: 'INNO Design Studio' }],
      replyTo: { email, name },
      subject,
      htmlContent: html,
      textContent: text,
      tags: ['innostudio-contact'],
    }),
  });

  if (!res.ok) {
    console.log('Brevo error', res.status, await res.text());
    return json(502, { error: 'send' });
  }
  return json(200, { ok: true });
}

export async function onRequest() {
  return json(405, { error: 'method' });
}
