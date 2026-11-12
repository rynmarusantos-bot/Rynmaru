export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [] } = req.body || {};
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GROQ_API_KEY não configurada no Vercel' });
  }

  const systemPrompt = `Você é um narrador de histórias interativas em português do Brasil, estilo "escolha sua própria aventura".

Regras importantes:
- Escreva partes curtas, no máximo 120 palavras, fáceis de ler em tela de celular.
- Sempre termine com exatamente 3 opções numeradas (1, 2, 3) para o usuário escolher o próximo passo.
- Mantenha o tom empolgante, simples e direto.
- Nunca saia do personagem de narrador.
- Não faça perguntas ao usuário além das 3 opções.
- Responda apenas com o texto da história e as 3 opções, sem explicações extras.`;

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history.slice(-6).map((h) => ({ role: h.role, content: h.content })),
    { role: 'user', content: message }
  ];

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages,
        temperature: 0.8,
        max_tokens: 450
      })
    });

    const data = await groqRes.json();
    const text = data.choices?.[0]?.message?.content || 'A história parou por aqui.';

    // Extrai as 3 opções numeradas que a IA escreveu
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    const choices = lines
      .filter((l) => /^[1-3]\.?\s/.test(l))
      .map((l) => l.replace(/^[1-3]\.?\s*/, ''))
      .slice(0, 3);

    const newHistory = [
      ...history,
      { role: 'user', content: message },
      { role: 'assistant', content: text }
    ].slice(-8);

    return res.json({ text, choices: choices.length > 0 ? choices : ['Continuar'], history: newHistory });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Erro ao gerar história' });
  }
}
