# SEVA1

A next-generation service-based platform for booking repair, maintenance, and installation services.

## Tech Stack

- **Next.js 16** — React framework with App Router
- **TypeScript 5** — Type-safe development
- **Tailwind CSS 4** — Utility-first styling
- **shadcn/ui** — Accessible UI components (Radix UI)
- **React Hook Form + Zod** — Form handling & validation
- **Sonner** — Toast notifications

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/           # Next.js App Router pages & API routes
│   ├── api/       # API routes
│   ├── about/     # About page
│   ├── book/      # Booking flow
│   ├── categories/# Category listing & detail
│   ├── contact/   # Contact page
│   ├── products/  # Product detail pages
│   └── services/  # Service detail pages
├── components/
│   ├── seva/      # App-specific components
│   └── ui/        # shadcn/ui components
├── hooks/         # Custom React hooks
└── lib/           # Utilities & static data
```

## License

Private
