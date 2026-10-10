---
name: frontend-design-system
description: Guia e especificações do Design System e convenções de UI para o projeto Estudo Bíblico. Use sempre que for criar ou refatorar páginas, layouts ou componentes frontend.
---

Este documento define os princípios visuais, diretrizes de UI/UX, tokens de cores, tipografia estrita e convenções arquiteturais de frontend para o projeto **Estudo Bíblico**.

---

## 🎨 1. Paleta de Cores & Tokens (Tailwind CSS)

Definidas em `styles/globals.css` e aplicáveis via Tailwind CSS:

### 🔹 Cores Primárias
- **Primary Blue**: `#3266F1` (Ações principais, botões, estados ativos, links e destaques)
  - Variações: Dark `#0D48D7` / Hover `#04257E` / Light `#EEF3FF` / Border `#C6D8FF`
- **Neutral Dark / Navy**: `#161B2C` e `#162235` (Títulos e textos de alto contraste)
- **Background Principal**: `#FAFAFB` (Fundo suave off-white da aplicação)
- **White**: `#FFFFFF` (Superfície de cards, modais e formulários)

### 🌈 Cores Semânticas / Secundárias
- **Verde (Success)**: `#47A46A` / `#66C873` (Estados válidos, concluídos e online)
- **Vermelho (Danger / Error)**: `#E05E4D` / `#C7332A` (Mensagens de erro e ações destrutivas)
- **Laranja (Warning)**: `#ED7B37` / `#F5AF45` (Alertas e atenção)
- **Teal / Roxo / Rosa**: `#205F70`, `#4A3DBF`, `#A72775` (Categorias e tags secundárias)

### ⚪ Neutros & Superfícies
- Bordas: `#E7E9EA`
- Textos auxiliares: `#59656C` e `#7B878E`
- Placeholders / Desabilitados: `#A2ABB0`, `#D4D6DA` e fundo `#ECEEEF`

---

## ✍️ 2. Tipografia Estrita (Componentes `<Heading>` e `<Text>`)

> [!IMPORTANT]
> **Regra de Ouro**: Em vez de declarar `<p className="...">` e `<h1 className="...">` com classes ad-hoc repetidas, utilize sempre os componentes padronizados `<Heading>`, `<Text>` e `<SectionHeader>` de `@/components/ui`.
> **Sem Itálico**: Todas as fontes do projeto são retas (*upright/normal*).

### 📜 Títulos: `<Heading level={1|2|3|4|5|6} color="default|primary|muted|white">`
- **Família**: `P22 Mackinac Pro` / Serif (estilo normal, nunca itálico)
- `level={1}`: ExtraBold (800) — 84px / 96px
- `level={2}`: Bold (700) — 64px / 76px
- `level={3}`: Bold (700) — 48px / 60px
- `level={4}`: Semi Bold (600) — 40px / 52px
- `level={5}`: Semi Bold (600) — 32px / 44px
- `level={6}`: Semi Bold (600) — 24px / 36px

```jsx
<Heading level={1}>O EBI é JÓIA</Heading>
<Heading level={2} color="primary">Passo 1: Joelho no chão</Heading>
```

### 📄 Parágrafos e Textos: `<Text variant="body1|body2|body3|body4|body5" color="default|muted|subtle|primary">`
- **Família**: `Inter` / Sans-Serif (estilo normal)
- `body1`: 20px / 30px (Medium)
- `body2`: 18px / 28px (Medium)
- `body3`: 16px / 26px (Regular)
- `body4`: 14px / 24px (Regular — padrão)
- `body5`: 12px / 22px (Regular — legendas/detalhes)

```jsx
<Text variant="body3">Metodologia indutiva para examinar as Escrituras.</Text>
<Text variant="body5" color="subtle">Etapa 1 de 4</Text>
```

### ➖ Divisor de Seção: `<SectionHeader title="..." />`
- Renderiza o título em Serif maiúsculo acompanhado da linha horizontal característica do Behance (`Título ————`).

```jsx
<SectionHeader title="Fluxo do Método" />
```

---

## 📖 3. As 5 Etapas do Estudo Bíblico Indutivo

1. **Olhe para cima** (`ArrowUp`): O que esse texto aponta e revela sobre Deus, Seu amor e caráter?
2. **Olhe para baixo** (`ArrowDown`): O que revela do ser humano, suas fragilidades, atitudes ou pecados?
3. **O que não entendi** (`HelpCircle`): Quais dúvidas, perguntas difíceis ou termos você gostaria de se aprofundar?
4. **Insights** (`Lightbulb`): Quais verdades, destaques e revelações mais saltam aos seus olhos?
5. **Aplicação** (`ArrowRight`): Como transformar essa palavra em ação prática no dia a dia hoje?

---

## 🏗️ 4. Arquitetura de Componentes (`@/components/ui`)

O projeto segue a metodologia de **Atomic Design** (Átomos, Moléculas e Organismos):

1. **Centralização em `@/components/ui`**:
   - Todo componente base de interface deve residir em `components/ui/` e ser exportado no barrel `components/ui/index.js`.
   - **Regra**: Antes de implementar qualquer elemento visual, verifique os componentes já existentes em `components/ui/`. Se um novo componente for criado, siga o mesmo padrão de variants (CVA), `cn()` para mesclagem de classes Tailwind e exporte-o no index.

2. **Evitar cortes de elementos flutuantes**:
   - Evite `overflow-hidden` em containers e cards que possam abrigar menus suspensos, datepickers, selects ou popovers.
   - Componentes com dropdown/popover devem gerenciar seu próprio `z-index` quando abertos.

3. **Vitrine Visual (`/design-system`)**:
   - A página `pages/design-system/index.js` serve como living style guide e vitrine interativa para testar todos os componentes em tempo real.
   - Ao adicionar novos componentes de UI, inclua uma seção de demonstração nessa página.
