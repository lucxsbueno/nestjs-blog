# 🚀 Blog API

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
</p>

## 📝 Description

A modern blog API built with NestJS and Prisma, providing a robust backend for your blog application. This project implements best practices in terms of architecture, security, and performance.

## 🛠️ Tech Stack

- **Framework:** [NestJS](https://nestjs.com/)
- **Database ORM:** [Prisma](https://www.prisma.io/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Testing:** [Jest](https://jestjs.io/)
- **Code Quality:** ESLint + Prettier

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (or your preferred database)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/blog.git
cd blog
```

2. Install dependencies:

```bash
npm install
```

3. Set up your environment variables:

```bash
cp .env.example .env
```

4. Initialize the database:

```bash
npx prisma migrate dev
```

### Running the Application

```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📚 API Documentation

The API documentation is available at `/api` when running the application in development mode.

## 🔧 Available Scripts

- `npm run build` - Build the application
- `npm run start:dev` - Start the application in development mode
- `npm run start:prod` - Start the application in production mode
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run test:cov` - Run test coverage

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Lucas Bueno - Initial work

## 🙏 Acknowledgments

- [NestJS](https://nestjs.com/) - The framework used
- [Prisma](https://www.prisma.io/) - The ORM used
- All contributors who have helped shape this project
