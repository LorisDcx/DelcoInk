const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'contact@delco-ink.fr';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'Delco Ink <contact@delco-ink.fr>';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default async function handler(request, response) {
  // Enable CORS
  response.setHeader('Access-Control-Allow-Credentials', true);
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method not allowed' });
  }

  let body;
  try {
    body = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : request.body || {};
  } catch {
    return response.status(400).json({ error: 'Invalid JSON body' });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const subject = String(body.subject || 'Renseignement').trim();
  const message = String(body.message || '').trim();
  const cgpAcceptedAt = String(body.cgpAcceptedAt || '').trim();

  if (body.botField) {
    return response.status(200).json({ ok: true });
  }

  if (!name || !email || !message || !body.gdprConsent || !body.cgpConsent) {
    return response.status(400).json({ error: 'Missing required fields' });
  }

  if (!process.env.RESEND_API_KEY) {
    return response.status(500).json({ error: 'Missing RESEND_API_KEY' });
  }

  const acceptedAt = cgpAcceptedAt || new Date().toISOString();
  const resendResponse = await fetch('https://api.resend.com/emails', {
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

  if (!resendResponse.ok) {
    return response.status(502).json({ error: 'Email provider failed' });
  }

  return response.status(200).json({ ok: true });
}
