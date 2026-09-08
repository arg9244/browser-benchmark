# Contributing to Browser Benchmark Analytics

Thank you for your interest in contributing! 🎉

This document outlines the process for contributing to the project.

## 🚀 Getting Started

1. **Fork the repository** (click the "Fork" button on GitHub)
2. **Clone your fork**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/browser-benchmark.git
   cd browser-benchmark
   ```
3. **Set up the remote**:
   ```bash
   git remote add upstream https://github.com/arg9244/browser-benchmark.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   # or
   bun install
   ```

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+ or Bun 1.0+
- Modern web browser

### Running Locally
```bash
# Start development server
npm run dev
# or
bun dev

# Open http://localhost:3000 in your browser
```

### Building for Production
```bash
npm run build
# or
bun run build
```

## 📝 Code Style

- **Language**: TypeScript + JSX
- **Styling**: Tailwind CSS
- **Formatting**: Use Prettier (if configured)
- **Linting**: Follow existing code patterns

### Naming Conventions
- **Files**: `kebab-case.tsx` (e.g., `App.tsx`, `data-loader.ts`)
- **Components**: `PascalCase` (e.g., `BrowserCard.tsx`)
- **Variables/functions**: `camelCase`
- **Constants**: `UPPER_SNAKE_CASE`

## 💾 Database & Data

The project uses JSON data files for browser benchmarks. If you're adding new data:
1. Follow the existing JSON schema
2. Add the file to the `public/data/` directory
3. Update the data loader if necessary

## 🧪 Testing

Currently, the project doesn't have automated tests. When adding features:
- Test manually in multiple browsers
- Ensure responsive design works
- Verify accessibility

## 📤 Submitting Changes

1. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes** and commit them:
   ```bash
   git add .
   git commit -m "Add: description of your changes"
   ```

3. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

4. **Open a Pull Request** on the main repository

### Commit Message Format
```
<type>: <description>

[optional body]

[optional footer]
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## ❓ Questions?

- Open an **issue** for questions or bugs
- Use **Discussions** for general questions
- Check existing issues first to avoid duplicates

## 🙏 Recognition

Thanks to all contributors! Your work makes this project better for everyone.