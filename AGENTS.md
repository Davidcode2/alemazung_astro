# AGENTS.md - Alemazung Astro Project Documentation

## Project Overview

**Alemazung Website (Astro)** - A modern, multilingual personal website for Dr. Joy A. Alemazung, Bürgermeister (Mayor) of Heubach and accomplished scientist. This is an Astro.js migration of the original Next.js application.

### About Dr. Joy A. Alemazung

- **Role**: Bürgermeister (Mayor) of Heubach, Germany
- **Expertise**: Sustainability, migration policy, international relations
- **Content Areas**: 
  - Bürgermeisteramt (Mayor's Office work)
  - Wissenschaft und Publikationen (Science & Publications)
  - Vorträge und Medien (Lectures & Media)
  - Blog posts and family information

## Project Setup

### Technologies

- **Framework**: Astro 6.x with Islands Architecture
- **UI Framework**: React 19 (for interactive components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 with CSS custom properties
- **CMS**: Strapi (headless CMS for content management)
- **Package Manager**: pnpm
- **Internationalization**: Built-in Astro i18n with URL-based language switching

### Repository Structure

```
alemazung_astro/
├── src/
│   ├── layouts/
│   │   └── Layout.astro              # Base layout with fonts, navigation, footer
│   ├── pages/
│   │   ├── index.astro               # Root redirect to default locale
│   │   └── [lang]/
│   │       ├── index.astro           # Homepage
│   │       ├── impressum.astro       # Legal page
│   │       ├── [slug].astro          # Dynamic content pages
│   │       └── posts/
│   │           └── [slug].astro      # Blog post pages
│   ├── components/
│   │   ├── menu/
│   │   │   ├── TopNavigation.astro
│   │   │   ├── DesktopNav.astro
│   │   │   ├── MobileNav.astro
│   │   │   ├── MenuItems.astro
│   │   │   ├── Footer.astro
│   │   │   ├── ThemeSwitcher.astro
│   │   │   └── LanguageSwitcher.astro
│   │   ├── homepage/
│   │   │   ├── HeroImage.astro
│   │   │   ├── ShortHeroImage.astro
│   │   │   ├── description/
│   │   │   ├── heroSummaryQuoteSeparator/
│   │   │   ├── imageMenu/
│   │   │   ├── quote/
│   │   │   └── socialLinks/
│   │   ├── shared/
│   │   │   ├── BackButton.astro
│   │   │   ├── MoreButton.astro
│   │   │   ├── ObfuscatedEmail.astro
│   │   │   ├── ObfuscatedEmailButton.astro
│   │   │   ├── SocialLinksList.astro
│   │   │   └── VerticalDividerBracket.astro
│   │   ├── posts/
│   │   │   ├── PostGrid.astro
│   │   │   └── PostPreviewCard.astro
│   │   ├── post/
│   │   │   ├── StrapiRichText.astro
│   │   │   └── ImageComponent.astro
│   │   └── contact/
│   │       └── ContactForm.tsx       # React component (client:load)
│   ├── lib/
│   │   ├── i18n.ts                   # Internationalization utilities
│   │   ├── api-helpers.ts            # Strapi URL helpers
│   │   └── fetch-api.ts              # Strapi API fetcher
│   ├── content/
│   │   └── impressum/
│   │       ├── de.ts
│   │       ├── en.ts
│   │       └── types.ts
│   └── styles/
│       └── global.css                # Global styles with Tailwind
├── public/
│   └── images/                       # Static images
├── astro.config.mjs                  # Astro configuration
├── tsconfig.json                     # TypeScript configuration
└── package.json
```

### Key Features

- **Multilingual Support**: Dynamic routing with `/en/` and `/de/` (or `/de-DE/`) prefixes
- **Islands Architecture**: React components only hydrate when needed (client:load)
- **Strapi CMS Integration**: Content (pages, posts, images) managed in Strapi
- **Rich Text Rendering**: Custom renderer for Strapi's rich text blocks
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Dark Mode**: Full dark mode support with localStorage persistence
- **Static Generation**: Pages generated from Strapi content via `getStaticPaths()`

## Development Guidelines

### Code Quality

#### Function Length
- **Maximum**: 60 lines per function
- Break complex logic into smaller, focused functions
- Each function should do one thing well

#### Component Design
- **Astro Components**: For static content and server-side rendering
- **React Components**: Only for client-side interactivity (forms, modals, etc.)
- Use TypeScript interfaces/types for all props
- Use `client:load` directive only when needed

#### Variable & Function Naming
- Use descriptive, clear names
- Boolean variables: start with `is`, `has`, `should`, `can`
- Functions: use verbs (`fetchData`, `renderContent`)

### Strapi Integration

#### Fetching Content
- Always pass `locale` parameter for multilingual content
- Use `populate` to eager-load relationships
- Handle API errors gracefully with try/catch

```typescript
const response = await fetchAPI('/posts', {
  filters: { slug },
  populate: { content: { populate: '*' } }
}, {}, locale);
```

#### Rich Text Rendering
- Use `StrapiRichText` component for any Strapi rich text blocks
- Component handles all formatting (bold, italic, links, headings, lists)

### Navigation & Links

#### Locale in URLs
- **All links must include locale prefix**: `/{locale}/page-slug`
- Pass `locale` prop through components
- Use template literals: `href={`/${locale}/path`}`

### Astro vs React Components

- **Astro Components** (default):
  - Static content
  - Data fetching (Strapi API calls)
  - Server-side rendering
  - Access to `Astro.params`, `Astro.props`

- **React Components** (`client:load`):
  - Event handlers (`onClick`, `onChange`)
  - State management (`useState`)
  - Browser APIs (`window`, `localStorage`)
  - Forms with validation

### Styling

- Use Tailwind CSS utility classes
- Support dark mode with `dark:` prefix
- Use CSS custom properties for theme colors:
  - `var(--accent)`, `var(--background)`, `var(--grey-accent)`, etc.
- Responsive: mobile-first approach
  - Base styles for mobile
  - `md:`, `lg:`, `xl:` prefixes for larger screens

### TypeScript

- Define types for all props using `interface` keyword
- Create reusable type definitions
- Avoid `any`; use `unknown` if necessary

### Performance

- Use native `<img>` tags with `width` and `height` attributes
- Implement `getStaticPaths()` for dynamic routes
- Minimize client-side JavaScript - use Astro components when possible

## Environment Variables

Create a `.env` file with:

```env
# Development
STRAPI_API_URL_DEV=http://localhost:1337
STRAPI_API_TOKEN_DEV=your-dev-token

# Production
STRAPI_API_URL_PROD=https://api.alemazung.de
STRAPI_API_TOKEN_PROD=your-prod-token

# Contact Form
PUBLIC_MESSAGE_ROUTER_URL=https://notifications.jakob-lingel.dev/v1/submit
PUBLIC_MESSAGE_ROUTER_API_KEY=your-api-key
```

## Development Workflow

1. **Create/Modify Content**: Update in Strapi CMS
2. **Update Code**: Make changes to components or pages
3. **Test Locally**: Run `pnpm dev` and test across locales
4. **Build**: `pnpm build` (triggers static generation)
5. **Preview**: `pnpm preview` to test built site

## Common Tasks

### Adding a New Page
1. Create file: `src/pages/[lang]/new-page.astro`
2. Add `getStaticPaths()` if dynamic routes needed
3. Fetch data with `fetchAPI()`
4. Add navigation link with locale prefix

### Adding Client-Side Interactivity
1. Create `.tsx` file in components
2. Import React hooks as needed
3. Use `client:load` directive in Astro template
4. Keep Astro components for static content

## CMS Repository

The Strapi CMS lives in a separate repository:

👉 **[`Davidcode2/alemazung_cms`](https://github.com/Davidcode2/alemazung_cms)**

## Commands

```bash
pnpm dev      # Start development server
pnpm build    # Build for production
pnpm preview  # Preview production build
```

## Differences from Next.js Version

| Next.js | Astro |
|---------|-------|
| `next/link` | `<a>` tags |
| `next/image` | Native `<img>` |
| `next/router` | `history.back()` |
| `next-themes` | Custom script in Layout |
| Server Components | Astro components (default) |
| Client Components | React with `client:*` directives |
| `generateStaticParams()` | `getStaticPaths()` |
| `useRouter()` | N/A (use native browser APIs) |
