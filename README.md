# Rynmaru — Sua História Interativa

Um jogo de texto no estilo "escolha sua própria aventura", escrito em português e impulsionado por IA. Roda direto no navegador do celular.

## Como funciona
1. Você lê um pedaço da história.
2. Escolhe entre 3 opções (ou digita sua própria ação).
3. A IA continua a história de acordo com sua escolha.

## O que está neste projeto
- `index.html` — o site que você abre no celular.
- `api/generate.js` — função que chama a IA (Groq) e retorna o próximo pedaço da história.
- `vercel.json` — configuração para publicar gratuitamente no Vercel.

## Como colocar online (de graça)

### 1. Obtenha uma chave gratuita da Groq
- Acesse [console.groq.com](https://console.groq.com) pelo navegador do celular.
- Crie uma conta gratuita.
- Vá em "API Keys" e crie uma nova chave. Copie ela (começa com `gsk_...`).

### 2. Publique no Vercel
- Acesse [vercel.com](https://vercel.com) e faça login com a conta GitHub.
- Importe este repositório (`Rynmaru`).
- Em **Settings → Environment Variables**, adicione:
  - Nome: `GROQ_API_KEY`
  - Valor: cole a chave que copiou da Groq.
- Clique em **Deploy**.

Pronto! Abra o link que o Vercel gerar no seu celular e comece a jogar.

## Modelos usados
Por padrão usa `llama-3.1-8b-instant` da Groq (rápido e dentro do plano gratuito). Você pode trocar em `api/generate.js`.
