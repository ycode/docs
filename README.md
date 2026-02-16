# Ycode Documentation

The official documentation for [Ycode](https://github.com/niceformal/ycode) — an open-source visual website builder.

Built with [Nextra](https://nextra.site/) (Next.js + MDX).

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Local Development

```bash
# Clone the repository
git clone https://github.com/niceformal/ycode-docs.git
cd ycode-docs

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000/docs](http://localhost:3000/docs) in your browser.

### Build

```bash
npm run build
npm run start
```

## Project Structure

```
ycode-docs/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout with Nextra theme
│   └── docs/               # Docs route handler
├── content/                # Documentation pages (MDX)
│   ├── _meta.ts            # Sidebar ordering
│   ├── index.mdx           # Introduction
│   ├── getting-started/    # Getting Started section
│   ├── editor/             # Editor section
│   ├── cms/                # CMS section
│   ├── forms/              # Forms section
│   ├── assets/             # Assets section
│   ├── localization/       # Localization section
│   ├── seo/                # SEO section
│   ├── integrations/       # Integrations section
│   ├── deployment/         # Deployment section
│   └── api-reference/      # API Reference section
├── components/             # Custom MDX components
├── scripts/screenshots/    # Playwright screenshot automation
├── public/                 # Static assets
│   ├── screenshots/        # Documentation screenshots
│   └── videos/             # Documentation videos
└── .cursor/rules/          # Cursor AI writing guidelines
```

## Contributing

We welcome contributions from the community! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Quick Contribution Guide

1. Fork this repository
2. Create a branch: `git checkout -b docs/your-topic`
3. Make your changes to files in `content/`
4. Test locally with `npm run dev`
5. Submit a pull request

## Automated Screenshots

Screenshots can be captured automatically from a running Ycode instance using Playwright:

```bash
# Start Ycode locally first (in the ycode project directory)
npm run dev

# Then capture screenshots (in this docs directory)
npm run screenshots
```

Screenshots are saved to `public/screenshots/` and referenced in MDX with the `<Screenshot>` component.

## Tech Stack

- [Next.js](https://nextjs.org/) — React framework
- [Nextra 4.0](https://nextra.site/) — Documentation framework
- [MDX](https://mdxjs.com/) — Markdown + JSX
- [Pagefind](https://pagefind.app/) — Full-text search
- [Playwright](https://playwright.dev/) — Screenshot automation

## License

This documentation is licensed under the [MIT License](LICENSE).
