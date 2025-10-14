# Contributing to 0day.sigma Archive

Thank you for your interest in contributing to the 0day.sigma Archive! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a feature request:

1. Check existing [issues](https://github.com/your-username/0day-archive-app/issues) first
2. Create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/OS information

### Suggesting Features

We welcome feature suggestions! Please:

1. Check if the feature already exists
2. Describe the use case and benefits
3. Provide mockups or examples if possible
4. Consider implementation complexity

### Code Contributions

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
   - Follow the coding standards
   - Add tests if applicable
   - Update documentation
4. **Test your changes**
   ```bash
   npm run dev
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Create a Pull Request**

## 📋 Development Guidelines

### Code Style

- Use TypeScript for all new code
- Follow the existing code structure
- Use meaningful variable and function names
- Add comments for complex logic
- Use Prettier for code formatting

### Component Guidelines

- Use functional components with hooks
- Follow the existing component structure
- Use shadcn/ui components when possible
- Add proper TypeScript types
- Include proper error handling

### API Guidelines

- Use RESTful API patterns
- Include proper error responses
- Add input validation
- Use appropriate HTTP status codes
- Document API endpoints

### Testing

- Test your changes thoroughly
- Check both desktop and mobile views
- Test different browsers
- Verify performance impact
- Test error scenarios

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   └── ...             # Custom components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
└── types/              # TypeScript type definitions
```

## 🚀 Getting Started

1. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/0day-archive-app.git
   cd 0day-archive-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open http://localhost:3000**

## 📝 Pull Request Guidelines

### Before Submitting

- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Tests pass locally
- [ ] Documentation updated
- [ ] No console errors or warnings
- [ ] Responsive design verified

### PR Description

Include:
- What changes were made
- Why the changes were necessary
- How to test the changes
- Screenshots if UI changes
- Breaking changes (if any)

### Review Process

1. Automated checks must pass
2. Code review by maintainers
3. Address feedback and suggestions
4. Merge after approval

## 🐛 Bug Reports

When reporting bugs, include:

- **Environment**: OS, browser, Node.js version
- **Steps to reproduce**: Detailed steps
- **Expected behavior**: What should happen
- **Actual behavior**: What actually happens
- **Screenshots**: If applicable
- **Console errors**: Any error messages

## 💡 Feature Requests

For feature requests:

- **Use case**: Why is this needed?
- **Proposed solution**: How should it work?
- **Alternatives**: Other approaches considered
- **Additional context**: Any other relevant info

## 🔒 Security

If you discover a security vulnerability:

1. **DO NOT** create a public issue
2. Email security concerns to: security@example.com
3. Include detailed information about the vulnerability
4. Allow time for response before public disclosure

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/)

## ❓ Questions?

- Open a [discussion](https://github.com/your-username/0day-archive-app/discussions)
- Check existing issues
- Contact maintainers

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to 0day.sigma Archive! 🎉
