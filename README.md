# Neqo360 - Modern Web Development Agency Website

A modern, accessible, and performant website built with Next.js 15, React 19, TypeScript, and Tailwind CSS. This project showcases best practices in web development including security, accessibility, error handling, and user experience.

## 🚀 Features

### Core Features
- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation
- **Performance**: Optimized with code splitting, lazy loading, and image optimization
- **Security**: CSRF protection, input sanitization, rate limiting, and XSS prevention

### User Experience
- **Contact Forms**: Validated contact and meeting request forms
- **Interactive Calendar**: Date and time selection for meeting bookings
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Skeleton loaders and loading indicators
- **Error Handling**: Comprehensive error boundaries and user-friendly error messages

### Developer Experience
- **Type Safety**: Full TypeScript coverage with proper type definitions
- **Code Quality**: ESLint, Prettier, and comprehensive validation
- **API Client**: Centralized API handling with interceptors and retry logic
- **Error Management**: Structured error handling with proper logging
- **Documentation**: JSDoc comments and comprehensive README

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **Email**: Resend
- **Security**: DOMPurify, CSRF tokens, rate limiting
- **UI Components**: Custom component library
- **State Management**: React hooks and context

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/neqo360.git
   cd neqo360
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Edit `.env.local` and add your configuration:
   ```env
   # Email Configuration
   RESEND_API_KEY=your_resend_api_key_here
   FROM_EMAIL=onboarding@resend.dev
   TO_EMAIL=hello@neqo360.com

   # Security Configuration
   NODE_ENV=development
   ALLOWED_ORIGINS=http://localhost:3000,https://neqo360.com

   # Rate Limiting
   RATE_LIMIT_MAX_REQUESTS=5
   RATE_LIMIT_WINDOW_MS=900000

   # CSRF Protection
   CSRF_SECRET=your-super-secret-csrf-key-change-this-in-production
   ```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
neqo360/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   └── contact/              # Contact form API
│   ├── components/               # React components
│   │   ├── layout/               # Layout components
│   │   ├── sections/             # Page sections
│   │   ├── ui/                   # Reusable UI components
│   │   ├── modals/               # Modal components
│   │   └── lazy/                 # Lazy-loaded components
│   ├── lib/                      # Utility libraries
│   │   ├── api/                  # API client
│   │   ├── config/               # Configuration
│   │   ├── hooks/                # Custom hooks
│   │   ├── types/                # TypeScript types
│   │   ├── utils/                # Utility functions
│   │   └── validation/           # Validation schemas
│   ├── providers/                # Context providers
│   └── globals.css               # Global styles
├── public/                       # Static assets
├── env.example                   # Environment variables template
└── README.md                     # This file
```

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types
```

### Code Quality

The project uses several tools to maintain code quality:

- **ESLint**: Code linting with Next.js and TypeScript rules
- **Prettier**: Code formatting
- **TypeScript**: Static type checking
- **Zod**: Runtime type validation

### Component Development

When creating new components:

1. **Use TypeScript**: All components should be typed
2. **Add accessibility**: Include ARIA labels and keyboard navigation
3. **Add error handling**: Use ErrorBoundary for complex components
4. **Add loading states**: Use skeleton components for better UX
5. **Add JSDoc**: Document complex functions and components

### API Development

When creating new API routes:

1. **Use validation**: Implement Zod schemas for all inputs
2. **Add security**: Include CSRF protection and rate limiting
3. **Add logging**: Log all requests and errors
4. **Add error handling**: Return proper error responses
5. **Add CORS**: Configure proper CORS headers

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Other Platforms

The project can be deployed to any platform that supports Next.js:

- **Netlify**: Use `npm run build` and `npm run start`
- **Railway**: Automatic deployment from Git
- **DigitalOcean App Platform**: Container-based deployment

## 🔒 Security Features

### Implemented Security Measures

- **CSRF Protection**: All form submissions protected with CSRF tokens
- **Input Sanitization**: All user inputs sanitized with DOMPurify
- **Rate Limiting**: API endpoints protected against abuse
- **XSS Prevention**: HTML content properly sanitized
- **Environment Variables**: Sensitive data stored in environment variables
- **Validation**: Server-side validation with Zod schemas

### Security Best Practices

- Never commit `.env.local` to version control
- Use strong, unique CSRF secrets in production
- Regularly update dependencies
- Monitor for security vulnerabilities
- Use HTTPS in production

## ♿ Accessibility

### Implemented Accessibility Features

- **ARIA Labels**: All interactive elements properly labeled
- **Keyboard Navigation**: Full keyboard support for all components
- **Focus Management**: Proper focus handling in modals and forms
- **Screen Reader Support**: Semantic HTML and proper landmarks
- **Color Contrast**: WCAG AA compliant color ratios
- **Error Announcements**: Screen reader announcements for errors

### Accessibility Testing

- Test with keyboard navigation only
- Use screen readers (NVDA, JAWS, VoiceOver)
- Check color contrast ratios
- Validate with accessibility tools (axe, Lighthouse)

## 📊 Performance

### Performance Optimizations

- **Code Splitting**: Components lazy-loaded for better initial load
- **Image Optimization**: Next.js Image component for optimized images
- **Bundle Analysis**: Monitor bundle size and optimize
- **Caching**: Proper caching headers for static assets
- **Minification**: Production builds are minified and optimized

### Performance Monitoring

- Use Lighthouse for performance audits
- Monitor Core Web Vitals
- Track bundle size with `@next/bundle-analyzer`
- Monitor real user metrics

## 🧪 Testing

### Testing Strategy

The project is set up for comprehensive testing:

- **Unit Tests**: Test individual components and functions
- **Integration Tests**: Test API endpoints and form submissions
- **E2E Tests**: Test complete user workflows
- **Accessibility Tests**: Automated a11y testing

### Running Tests

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Accessibility tests
npm run test:a11y
```

## 📝 Contributing

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**: Follow the coding standards
4. **Add tests**: Ensure all new code is tested
5. **Commit your changes**: Use conventional commit messages
6. **Push to the branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**: Provide a clear description of changes

### Coding Standards

- Follow TypeScript best practices
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Ensure accessibility compliance
- Write comprehensive tests
- Follow the existing code style

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support and questions:

- **Documentation**: Check this README and inline code comments
- **Issues**: Create an issue on GitHub
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact the development team

## 🎯 Roadmap

### Planned Features

- [ ] **PWA Support**: Service worker and offline functionality
- [ ] **Analytics**: User behavior tracking and analytics
- [ ] **CMS Integration**: Content management system
- [ ] **Blog**: Blog functionality with MDX
- [ ] **E-commerce**: Product catalog and checkout
- [ ] **Multi-language**: Internationalization support
- [ ] **Dark Mode**: Theme switching functionality
- [ ] **Real-time Features**: WebSocket integration

### Performance Goals

- [ ] Lighthouse score > 95 for all categories
- [ ] First Contentful Paint < 1s
- [ ] Largest Contentful Paint < 2s
- [ ] Cumulative Layout Shift < 0.1

---

**Built with ❤️ by the Neqo360 team**
