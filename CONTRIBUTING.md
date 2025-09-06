# 🤝 Contributing to PixelPerfect Resizer

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/PixelPerfectResizer.git`
3. **Create** a branch: `git checkout -b feature/your-feature-name`
4. **Make** your changes
5. **Test** your changes locally
6. **Commit** with conventional format: `git commit -m "feat: add new feature"`
7. **Push** to your fork: `git push origin feature/your-feature-name`
8. **Create** a Pull Request

## 📋 Pull Request Guidelines

### PR Title Format
Use conventional commits format:
```
type(scope): description

Examples:
feat: add dark mode toggle
fix: resolve image upload bug
docs: update installation guide
style: improve button animations
refactor: optimize image processing
test: add unit tests for resize function
chore: update dependencies
```

### PR Description Template
```markdown
## 📝 Description
Brief description of changes

## 🎯 Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## 🧪 Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile devices
- [ ] All existing tests pass

## 📱 Screenshots (if applicable)
Add screenshots for UI changes

## ✅ Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No breaking changes
```

## 🎨 Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Include `alt` attributes for images
- Maintain proper indentation (2 spaces)
- Use meaningful class names

### CSS
- Follow BEM methodology for class names
- Use CSS custom properties for colors
- Mobile-first responsive design
- Maintain consistent spacing

### JavaScript
- Use ES6+ features
- Add JSDoc comments for functions
- Handle errors gracefully
- Use meaningful variable names
- Avoid global variables

## 🧪 Testing

### Manual Testing Checklist
- [ ] Upload different image formats (JPG, PNG, WebP, GIF)
- [ ] Test resize functionality with various dimensions
- [ ] Verify transform tools (rotate, flip)
- [ ] Check responsive design on different screen sizes
- [ ] Test dark/light mode toggle
- [ ] Verify download functionality

### Browser Testing
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Bug Reports

When reporting bugs, include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Console errors (if any)

## 💡 Feature Requests

For new features:
- Describe the problem it solves
- Provide use cases
- Consider implementation complexity
- Check if similar features exist

## 📁 Project Structure

```
PixelPerfectResizer/
├── index.html              # Main application
├── styles.css              # Glassmorphism styles
├── script.js               # Core functionality
├── README.md               # Project documentation
├── CONTRIBUTING.md         # This file
├── LICENSE                 # MIT license
├── .gitignore             # Git ignore rules
├── .github/
│   └── workflows/
│       └── pr-checks.yml   # Automated checks
└── docs/
    ├── API.md              # API documentation
    ├── DEPLOYMENT.md       # Deployment guide
    └── CHANGELOG.md        # Version history
```

## 🎯 Development Focus Areas

### High Priority
- Performance optimizations
- Accessibility improvements
- Mobile experience enhancements
- Browser compatibility

### Medium Priority
- New image formats support
- Advanced editing features
- Batch processing
- Keyboard shortcuts

### Low Priority
- UI themes
- Animation improvements
- Code refactoring
- Documentation updates

## 🔒 Security Guidelines

- Never commit sensitive data
- Validate all user inputs
- Use secure coding practices
- Report security issues privately

## 📞 Getting Help

- **GitHub Issues:** For bugs and feature requests
- **Discussions:** For questions and ideas
- **Email:** support@sscgram.com

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Invited to maintainer team (for significant contributions)

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow project guidelines

---

**Happy Contributing! 🎉**