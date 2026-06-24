const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'contact@delco-ink.fr';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Delco Ink <onboarding@resend.dev>';
const RESEND_FALLBACK_FROM_EMAIL = 'Delco Ink <onboarding@resend.dev>';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  } catch {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const subject = String(body.subject || 'Renseignement').trim();
  const message = String(body.message || '').trim();
  const acceptedAt = String(body.cgpAcceptedAt || new Date().toISOString()).trim();

  if (body.botField) {
    return res.status(200).json({ ok: true });
  }

  if (!name || !email || !message || !body.gdprConsent || !body.cgpConsent) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('Contact form: missing RESEND_API_KEY');
    return res.status(500).json({ error: 'Email service is not configured' });
  }

  const emailPayload = {
    from: CONTACT_FROM_EMAIL,
    to: [CONTACT_TO_EMAIL],
    reply_to: email,
    subject: `Nouveau message Delco Ink - ${subject}`,
    html: `
      <h1>Nouveau message depuis delco-ink.fr</h1>
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> ${escapeHtml(email)}</p>
      <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
      <p><strong>CGP acceptees le :</strong> ${escapeHtml(acceptedAt)}</p>
      <hr>
      <p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>
    `,
    text: [
      'Nouveau message depuis delco-ink.fr',
      '',
      `Nom : ${name}`,
      `Email : ${email}`,
      `Sujet : ${subject}`,
      `CGP acceptees le : ${acceptedAt}`,
      '',
      message
    ].join('\n')
  };

  let response = await sendEmail(emailPayload);
  if (!response.ok && CONTACT_FROM_EMAIL !== RESEND_FALLBACK_FROM_EMAIL) {
    const providerError = await response.text();
    console.error('Contact form: Resend failed', response.status, providerError);

    if (providerError.includes('domain is not verified')) {
      response = await sendEmail({ ...emailPayload, from: RESEND_FALLBACK_FROM_EMAIL });
    } else {
      return res.status(502).json({ error: 'Email provider failed' });
    }
  }

  if (!response.ok) {
    const providerError = await response.text();
    console.error('Contact form: Resend failed', response.status, providerError);
    return res.status(502).json({ error: 'Email provider failed' });
  }

  return res.status(200).json({ ok: true });
}

function sendEmail(payload) {
  return fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
}
