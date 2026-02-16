# Contributing to Ycode Documentation

Thank you for your interest in improving the Ycode documentation! This guide explains how to contribute.

## Ways to Contribute

- **Fix typos and errors** — Small fixes are always welcome
- **Improve existing pages** — Add clarity, examples, or missing details
- **Add new content** — Document undocumented features
- **Add screenshots** — Visual guides help everyone
- **Translate content** — Help make docs accessible to more people

## Getting Started

### 1. Fork and Clone

```bash
git clone https://github.com/YOUR_USERNAME/ycode-docs.git
cd ycode-docs
npm install
```

### 2. Create a Branch

```bash
git checkout -b docs/your-topic
```

Use the `docs/` prefix for documentation changes.

### 3. Start the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs) to preview your changes. The server supports hot reload.

## Writing Documentation

### File Format

All documentation pages are MDX files (Markdown + JSX) located in the `content/` directory.

### Page Structure

Every page needs YAML frontmatter with at least a `title`:

```mdx
---
title: Your Page Title
---

# Your Page Title

Introduction paragraph.

## Section Heading

Content here.
```

### Sidebar Ordering

Each directory has a `_meta.ts` file that controls sidebar order and labels:

```ts
import type { MetaRecord } from 'nextra'

const meta: MetaRecord = {
  'page-slug': 'Display Title',
  'another-page': 'Another Page'
}

export default meta
```

### Adding a New Page

1. Create a new `.mdx` file in the appropriate `content/` subdirectory
2. Add frontmatter with `title`
3. Add the page to the directory's `_meta.ts` file
4. Write your content

### Adding a New Section

1. Create a new directory under `content/`
2. Add a `_meta.ts` file for sidebar ordering
3. Add an `index.mdx` with `asIndexPage: true` in frontmatter
4. Add the section to `content/_meta.ts`
5. Add child pages

### Available Components

You can use these components in MDX files:

```mdx
import { Callout } from 'nextra/components'
import { Steps } from 'nextra/components'
import { Screenshot } from '@/components/screenshot'
import { KeyboardShortcut } from '@/components/keyboard-shortcut'

<Callout type="info">
  A helpful tip.
</Callout>

<Steps>
### Step 1
Do this first.

### Step 2
Then do this.
</Steps>

<Screenshot src="feature-name.png" alt="Description" caption="Optional caption" />

Press <KeyboardShortcut keys="Cmd+S" /> to save.
```

### Style Guide

- Write in second person ("you")
- Use present tense
- Be concise and direct
- Use active voice
- Do not use emojis
- Keep paragraphs to 2-4 sentences
- Use headings to organize content
- Include code examples where helpful

## Screenshots

### Adding Screenshots Manually

Place screenshots in `public/screenshots/` with descriptive filenames:

```
public/screenshots/
  editor-overview.png
  cms-collection-fields.png
  forms-builder.png
```

Use the `<Screenshot>` component in MDX:

```mdx
<Screenshot src="editor-overview.png" alt="Ycode editor" caption="The three-panel editor layout" />
```

### Automated Screenshots

If you have a running Ycode instance, you can capture screenshots with Playwright:

```bash
npm run screenshots
```

See `scripts/screenshots/` for the capture scripts.

## Submitting Changes

### Pull Request Process

1. Make sure your changes build without errors: `npm run build`
2. Push your branch to your fork
3. Open a pull request against `main`
4. Fill out the PR template
5. Wait for review

### PR Guidelines

- Keep PRs focused — one topic per PR
- Include a clear description of what you changed and why
- If adding new pages, explain what they cover
- If changing existing content, explain what was wrong or unclear

## Code of Conduct

Be respectful and constructive. We are all here to make the documentation better.

## Questions?

If you have questions about contributing, open an issue on GitHub.
