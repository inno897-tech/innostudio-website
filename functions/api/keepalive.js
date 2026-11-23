// GET /api/keepalive — makes one harmless read call to Brevo so the API key
// counts as "used" (Brevo expires keys after 90 days without use).
// Called once a month by .github/workflows/keepalive.yml. Sends no email.
export async function onRequestGet({ env }) {
  if (!env.BREVO_API_KEY) return new Response('not configured', { status: 503 });
  const res = await fetch('https://api.brevo.com/v3/smtp/statistics/aggregatedReport?days=1', {
    headers: { 'api-key': env.BREVO_API_KEY, accept: 'application/json' },
  });
  if (!res.ok) console.log('Brevo keepalive failed', res.status, (await res.text()).slice(0, 300));
  return new Response(res.ok ? 'ok' : 'brevo error ' + res.status, {
    status: res.ok ? 200 : 502,
    headers: { 'cache-control': 'no-store' },
  });
}
