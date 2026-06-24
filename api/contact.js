const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'contact@delco-ink.fr';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Delco Ink <contact@delco-ink.fr>';

function json(status, body) {
  return { status, body };
}

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
    const result = json(405, { error: 'Method not allowed' });
    return res.status(result.status).json(result.body);
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
  } catch {
    const result = json(400, { error: 'Invalid JSON body' });
    return res.status(result.status).json(result.body);
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const subject = String(body.subject || 'Renseignement').trim();
  const message = String(body.message || '').trim();
  const cgpAcceptedAt = String(body.cgpAcceptedAt || '').trim();

  if (body.botField) {
    const result = json(200, { ok: true });
    return res.status(result.status).json(result.body);
  }

  if (!name || !email || !message || !body.gdprConsent || !body.cgpConsent) {
    const result = json(400, { error: 'Missing required fields' });
    return res.status(result.status).json(result.body);
  }

  if (!process.env.RESEND_API_KEY) {
    const result = json(500, { error: 'Missing RESEND_API_KEY' });
    return res.status(result.status).json(result.body);
  }

  const acceptedAt = cgpAcceptedAt || new Date().toISOString();
  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      reply_to: email,
      subject: `Nouveau message Delco Ink - ${subject}`,
      html: `
        <h1>Nouveau message depuis delco-ink.fr</h1>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
        <p><strong>CGP acceptées le :</strong> ${escapeHtml(acceptedAt)}</p>
        <hr>
        <p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>
      `,
      text: [
        'Nouveau message depuis delco-ink.fr',
        '',
        `Nom : ${name}`,
        `Email : ${email}`,
        `Sujet : ${subject}`,
        `CGP acceptées le : ${acceptedAt}`,
        '',
        message
      ].join('\n')
    })
  });

  if (!response.ok) {
    const result = json(502, { error: 'Email provider failed' });
    return res.status(result.status).json(result.body);
  }

  const result = json(200, { ok: true });
  return res.status(result.status).json(result.body);
}
