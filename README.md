# MEMORIES OS — site presente

Site emocional em Next.js + TypeScript + TailwindCSS + Framer Motion + Lenis,
seguindo o roteiro: Boot → Autenticação → Menu de Capítulos → Linha do Tempo → Galeria
→ Abra quando... → Terminal → Mapa de Lugares → Cápsula do Tempo → Manual da Anninha → Tela Final.

## Como rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000

## O que você precisa preencher antes de entregar

1. **Fotos** — coloque os arquivos reais em `public/photos/` e atualize os caminhos em:
   - `data/timeline.ts`
   - `data/photos.ts`

2. **Abra quando...** — edite os rótulos e textos das cartinhas em `data/openWhen.ts`
   (array `openWhenNotes`). Pode adicionar ou remover quantas quiser.

3. **Terminal** — edite as respostas dos comandos em `components/Terminal.tsx`,
   no objeto `COMMANDS` (ex: `whoami`, `date`, `hug`, `sobre`).

4. **Mapa de Lugares** — edite `data/places.ts` com as cidades reais, coordenadas
   (lat/lng — basta buscar "nome da cidade lat long" no Google) e a lembrança de cada lugar.

5. **Cápsula do Tempo** — edite `data/timeCapsule.ts`:
   - `unlockDate`: data em que a carta deve abrir (formato `AAAA-MM-DD`)
   - `timeCapsuleText`: o texto que só será revelado nessa data

6. **Manual da Anninha** — edite `data/manual.ts` (array `manualSections`) com os
   itens de cada seção (Especificações, Funcionalidades, Avisos, Suporte).

7. **Senha de acesso** — a data `07/08/2024` está em `components/AuthScreen.tsx`
   (constante `CORRECT_KEY`), no formato `DD/MM/AAAA`.

## Estrutura

```
app/            layout e página principal
components/     cada tela do site é um componente isolado
data/           conteúdo editável (timeline, fotos, cartinhas, lugares, cápsula, manual)
public/         imagens
```

## Deploy

O jeito mais simples é publicar na Vercel (gratuito):
1. Suba o projeto num repositório no GitHub
2. Importe o repositório em vercel.com
3. Deploy automático — você recebe um link para enviar a ela

## Notas técnicas

- O smooth scroll (Lenis) só é ativado depois da tela de autenticação, para não
  interferir nas transições de tela cheia do boot/auth.
- `prefers-reduced-motion` é respeitado globalmente (ver `app/globals.css`).
- As fotos de placeholder usam fallback silencioso caso o arquivo real ainda
  não exista — troque pelos arquivos reais antes de publicar.
