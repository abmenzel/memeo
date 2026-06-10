# 🧘 Memeo

Become a master at memorizing anything you would like.
Using simple [flashcards](https://en.wikipedia.org/wiki/Flashcard).

Memeo let's you create card decks with as many cards you want.
When practicing a card you can rate your confidence level. Thereby you can get a better overview of your progression.
This can be ideal when studying for an exam or learning a language.

## Technologies

-   **Frontend**: Next.js (React, TypeScript, Tailwind CSS)
-   **Backend**: Ruby on Rails 8 API (SQLite)

## Getting Started

This project is a monorepo with two components: a **frontend** and a **backend**.

### ⏳ Installation

Install dependencies for both components:

```bash
cd frontend && npm install
cd ../backend && bundle install
```

### Running Both Services

Start the **backend** (port 8000) and **frontend** (port 3000) in separate terminals:

```bash
# Terminal 1 - Backend
cd backend && bin/rails server

# Terminal 2 - Frontend
cd frontend && npm run dev
```

The frontend proxies `/api/*` and `/auth/*` requests to the backend, making both accessible at `http://localhost:3000`.

### Requirements

**Node:**

-   NodeJS >= 20
-   NPM >= 10.x

**Ruby:**

-   Ruby >= 3.3
-   Bundler

## Contributing

See the [Contributing Guide](./CONTRIBUTING.md).

## License

See the [License](./LICENSE.md).
