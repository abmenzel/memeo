# AGENTS.md - Memeo Development Guide

This is a monorepo with two components:
- **Frontend**: Next.js 14 (React 18) with TypeScript, Tailwind CSS
- **Backend**: Ruby on Rails 8 API with SQLite

## Build/Lint/Test Commands

### Frontend (in `frontend/` directory)

```bash
# Install dependencies
cd frontend && npm install

# Development server
npm run dev

# Production build
npm run build

# Lint (ESLint via Next.js)
npm run lint
```

### Backend (in `backend/` directory)

```bash
# Install Ruby dependencies
cd backend && bundle install

# Run a single test
bin/rails test test/models/user_test.rb          # Single file
bin/rails test test/models/user_test.rb:7         # Single test method (line 7)

# Run all tests
bin/rails test

# Run tests in parallel
bin/rails test -j 4

# RuboCop linting
bundle exec rubocop

# RuboCop auto-fix
bundle exec rubocop -a
```

## Code Style Guidelines

### General

- Tabs for indentation (tab size 4)
- No trailing whitespace
- Use meaningful variable/method names
- Keep files focused and under 200 lines when possible

### Frontend (TypeScript/React)

**Imports**
- Use absolute imports from package names
- Use relative imports for local components: `../components/Button`
- Order imports: external → internal → types
- Group React imports first

**TypeScript**
- Use explicit types for props and function signatures
- Prefer `type` over `interface` for simple object shapes
- Use `React.FC` for functional components

**Components**
- Use functional components with arrow functions
- Export components as default
- Use `clsx` for conditional class names
- Use `framer-motion` for animations (existing pattern)

**Tailwind CSS**
- Use existing theme colors (e.g., `bg-theme-dark`, `text-orange-100`)
- Use `gap-`, `p-`, `m-` spacing consistently
- Custom colors defined in `frontend/tailwind.config.js`

**Error Handling**
- Use try/catch for async operations
- Display user-friendly error messages in UI

### Backend (Ruby)

**Style**
- Uses `rubocop-rails-omakase` (Rails omakase style)
- 2-space indentation
- Double quotes for strings

**Models**
- Inherit from `ApplicationRecord`
- Use `has_secure_password` for authentication
- Use `normalizes` for attribute normalization
- Define associations with `dependent: :destroy`

**Controllers**
- Inherit from `ActionController::API` (JSON API only)
- Include `Authentication` concern for auth
- Use strong parameters

**Testing**
- Uses Minitest (Rails default)
- Test files in `test/` matching `*_test.rb`
- Use fixtures in `test/fixtures/`
- Use helpers from `test/test_helpers/`

### Git Conventions

- Use meaningful commit messages
- Create feature branches from `main`
- PRs reviewed by maintainer before merge

### Project Architecture

**Frontend Structure**
```
frontend/
├── pages/              # Next.js pages (file-based routing)
│   ├── _app.tsx       # App wrapper
│   ├── _document.tsx  # HTML document
│   └── dashboard/     # Dashboard routes
├── components/        # React components
│   ├── ui/            # Reusable UI components
│   └── animations/    # Animation components (framer-motion)
├── context/           # React context providers
└── styles/           # Global styles
```

**Backend Structure**
```
backend/
├── app/
│   ├── controllers/   # API controllers
│   ├── models/        # ActiveRecord models
│   ├── mailers/       # ActionMailer mailers
│   ├── helpers/       # View helpers
│   └── jobs/         # ActiveJob jobs
├── config/            # Rails configuration
├── db/                # Database migrations
├── test/              # Minitest tests
│   ├── controllers/   # Controller tests
│   ├── models/       # Model tests
│   ├── fixtures/     # Test fixtures
│   └── test_helpers/ # Test helpers
└── lib/               # Library code
```

### Development Workflow

1. **Setup**: Install frontend deps (`npm install`) and backend deps (`bundle install`)
2. **Frontend dev**: Run `npm run dev` in `frontend/`
3. **Backend dev**: Run `bin/rails server` in `backend/`
4. **Testing**: Run tests with `bin/rails test` (backend only - no frontend tests)
5. **Linting**: Run `npm run lint` (frontend) or `bundle exec rubocop` (backend)

### API Integration

- Frontend communicates with backend via REST API
- Authentication uses session-based auth with cookies
- Backend is API-only (`ActionController::API`)
- CORS configured for frontend origin

### Environment Variables

- Frontend: Uses `.env` file (see `.env.example`)
- Backend: Uses Rails credentials (see `config/master.key.example`)
- Both require proper env setup for full functionality
