# 🎨 Design System - Documentação Prática

## 📐 Arquitetura & Estrutura

### Camadas do Design System

```
Tokens (CSS Variables)
    ↓
UnoCSS Configuration (Semantic Shortcuts)
    ↓
Global Styles (Base Typography & Integration Support)
    ↓
Component Layer (BlogPost.astro, etc.)
```

---

## 🎯 Design Tokens

Todos os tokens são definidos em **CSS Variables** para máxima flexibilidade:

### Cores Semânticas

```css
/* Light Mode (default) */
--bg-color: #faf9f6              /* Canvas - Warm white */
--text-color: #1f2933            /* Primary - Strong identity */
--text-muted: #4b5563            /* Secondary - Body text */
--text-subtle: #7a8694           /* Tertiary - Captions */
--border-color: rgb(31 41 51/14%)
--surface-color: rgb(31 41 51/3.5%)
--highlight-color: rgb(31 41 51/8%)
--backdrop-color: rgb(31 41 51/44%)

/* Dark Mode - Automatic via html.dark */
html.dark {
  --bg-color: #121212
  --text-color: #e5e7eb
  /* etc... */
}
```

**Contraste WCAG AA+**: Todas as combinações garantem 4.5:1+ para texto normal.

### Tipografia - Escala Modular (1.2x)

```
Base: 18px (1.125rem)
Ratio: 1.2 (Perfect Fifth)

--step--2: 0.781rem  (12.5px)  → Captions, tiny text
--step--1: 0.938rem  (15px)    → Labels, footnotes
--step-0:  1.125rem  (18px)    → Body text (padrão)
--step-1:  1.35rem   (21.6px)  → H4/Subtitle
--step-2:  1.62rem   (25.9px)  → H3
--step-3:  1.944rem  (31.1px)  → H2
--step-4:  2.333rem  (37.3px)  → H1/Title
```

**Line Heights** (otimizados para leitura longa):
- `--leading-tight: 1.18` → Headings (compacto)
- `--leading-normal: 1.55` → Body (balanceado)
- `--leading-relaxed: 1.72` → Markdown (generoso)

### Famílias Tipográficas

- **Romana** (Identidade): `STIX`, `EarlySummer` (headings)
- **Sans-serif** (Body): `Inter`, `system-ui` (legibilidade)

---

## 🎨 UnoCSS Shortcuts - Semantic Classes

### Typography (Prose)

```astro
<!-- Heading Levels -->
<h1 prose-title>Main Title</h1>
<h1 prose-heading-1>Heading 1</h1>
<h2 prose-heading-2>Heading 2</h2>
<h3 prose-heading-3>Heading 3</h3>
```

**Compila para**:
```css
.prose-title {
  font-family: var(--font-serif);
  font-weight: 620;
  font-size: var(--step-4);
  line-height: var(--leading-tight);
  color: var(--text-color);
}
```

### Layout Utilities

```astro
<!-- Decorative separator -->
<div class="uno-decorative-line"></div>

<!-- Semantic surface -->
<div class="uno-surface rounded-lg p-4">Content</div>

<!-- Rounded border card -->
<div class="uno-round-border p-6">Card</div>
```

---

## ♿ Acessibilidade (A11y)

### Focus Management

```astro
<!-- Automatic focus ring (2px outline) -->
<a href="/blog" class="focus-visible-ring">Blog</a>

<!-- Using attributify syntax -->
<button focus-ring px-4 py-2>Click Me</button>
```

### Semantic HTML

```astro
<article role="main">
  <header>
    <h1>Article Title</h1>
    <time datetime="2024-01-15">January 15, 2024</time>
  </header>
  
  <div itemprop="articleBody">
    <!-- Content here -->
  </div>
  
  <footer role="contentinfo">
    <!-- Tags, metadata -->
  </footer>
</article>
```

### Contraste

- **Texto normal**: 4.5:1 (WCAG AA) → Todos os pares de cores primários
- **Texto grande**: 3:1 (WCAG AA) → Design tokens mais flexíveis
- **Focus indicators**: 2px solid outline com offset 2px

---

## 🔌 Integrações Suportadas

### KaTeX (Matemática)

```astro
<!-- Rendered by rehype-katex plugin -->
<div class="katex-display">
  <!-- Math formula -->
</div>

<!-- CSS automatically applies theme colors -->
.katex { color: var(--text-color); }
```

### Pagefind (Busca)

```astro
<div id="search"></div>
<script>
  import * as pagefind from '/pagefind/pagefind.js'
  
  window.addEventListener('DOMContentLoaded', async () => {
    await pagefind.options({
      highlightParam: 'highlight',
      processResult(result) {
        // Custom processing
      }
    })
    
    new pagefind.PagefindUI({
      element: '#search',
      baseUrl: '/'
    })
  })
</script>
```

**Styling** (Automatic via CSS variables):
```css
.pagefind-ui {
  --pagefind-ui-primary: var(--text-color);
  --pagefind-ui-background: var(--bg-color);
  --pagefind-ui-border: var(--border-color);
}
```

### Waline/Twikoo (Comentários)

```astro
<div id="waline"></div>
<script>
  import { init } from '@waline/client'
  
  init({
    el: '#waline',
    serverURL: 'your-server-url',
    dark: document.documentElement.classList.contains('dark')
  })
</script>
```

### Mermaid (Diagramas)

```astro
<!-- Rendered by rehype-mermaid plugin -->
<div class="mermaid">
  graph TD;
      A-->B;
      B-->C;
</div>

<!-- CSS ensures proper sizing -->
.mermaid svg { max-width: 100%; height: auto; }
```

---

## 💻 Uso Prático em Componentes

### BlogPost.astro (Exemplo Completo)

```astro
<BlogPost
  title="Advanced TypeScript Patterns"
  excerpt="Deep dive into generic constraints and utility types"
  author="Thiago Colman"
  date={new Date('2024-01-15')}
  readingTime="8 min read"
  tags={['typescript', 'design-patterns']}
>
  <slot /> {/* MDX content renders here */}
</BlogPost>
```

### Attributify Syntax

```astro
<!-- Before: Class-heavy, hard to read -->
<div class="p-4 bg-secondary/5 border border-secondary/12 rounded-sm">
  Content
</div>

<!-- After: Semantic, maintainable -->
<div p-4 bg-secondary/5 uno-round-border>
  Content
</div>

<!-- Even cleaner with shortcuts -->
<div p-4 uno-surface uno-round-border>
  Content
</div>
```

---

## 🛠️ Extending the System

### Adding New Tokens

1. **CSS Variable** (in `global.css`):
```css
:root {
  --my-token: value;
}

html.dark {
  --my-token: dark-value;
}
```

2. **UnoCSS Shortcut** (in `uno.config.ts`):
```ts
shortcuts: {
  'my-component': 'p-4 bg-secondary/5 rounded-sm hover:bg-secondary/10'
}
```

### Adding New Font

1. Add to `font.css`:
```css
@font-face {
  font-family: 'MyFont';
  src: url('/fonts/myfont.woff2') format('woff2');
}
```

2. Update `uno.config.ts`:
```ts
fontFamily: {
  custom: ['MyFont', 'fallback', 'sans-serif']
}
```

---

## 📊 Comparison: Before vs After

### Minimalismo em Ação

**Before** (Visual noise):
```astro
<div class="container mx-auto">
  <div class="flex justify-between items-center p-4 bg-white border">
    <h1 class="text-4xl font-serif font-bold text-gray-900">
      Title
    </h1>
    <p class="text-sm text-gray-600">By Author · Jan 15 · 5 min</p>
  </div>
</div>
```

**After** (Semantic, clean):
```astro
<article class="blog-post">
  <header class="blog-post__header">
    <h1 prose-title>{title}</h1>
    <div class="blog-post__meta">
      <span>{author}</span>
      <time>{date}</time>
      <span>{readingTime}</span>
    </div>
  </header>
</article>
```

---

## ✅ Checklist para Novos Componentes

- [ ] Use tags semânticas (`<article>`, `<header>`, `<footer>`, etc.)
- [ ] Aplique `prose-*` para tipografia consistente
- [ ] Adicione `role` e `aria-*` atributos onde necessário
- [ ] Use `:focus-visible` para navegação por teclado
- [ ] Teste modo claro **e** escuro
- [ ] Verifique contraste com [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [ ] Valide com [WAVE](https://wave.webaim.org/) ou [Axe](https://www.deque.com/axe/devtools/)

---

## 🚀 Performance & Best Practices

### Atributos de Otimização

```astro
<!-- Preload critical fonts -->
<link rel="preload" as="font" href="/fonts/stix.woff2" type="font/woff2" />

<!-- Lazy load images -->
<img loading="lazy" decoding="async" src="..." alt="..." />

<!-- Prefetch related posts -->
<link rel="prefetch" href="/posts/next-article/" />
```

### CSS Optimization

UnoCSS gera **apenas** os estilos usados:
- CSS bundle reduzido (~10-15KB)
- Build otimizado com purging automático
- Sem CSS carregado desnecessário

---

## 📚 Referências

- [UnoCSS Docs](https://unocss.dev/)
- [Attributify Mode](https://unocss.dev/presets/attributify)
- [WCAG 2.1 Contrast Guidelines](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Modular Typography Scale](https://spencermortensen.com/articles/typographic-scale/)
- [Astro Integrations](https://docs.astro.build/en/guides/integrations-guide/)

---

**Última atualização**: 2024 | Design System v1.0
