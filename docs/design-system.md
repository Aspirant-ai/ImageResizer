# 🎨 Design System

## Color Palette

### Primary Colors
```css
:root {
    /* Primary Gradients */
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --success-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    --warning-gradient: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
    --danger-gradient: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
}
```

### Neutral Colors
```css
:root {
    /* Light Theme */
    --bg-primary: #f8fafc;
    --bg-secondary: #e2e8f0;
    --text-primary: #1a202c;
    --text-secondary: #4a5568;
    --border-color: rgba(255, 255, 255, 0.2);
    
    /* Dark Theme */
    --bg-primary-dark: #0f172a;
    --bg-secondary-dark: #1e293b;
    --text-primary-dark: #f1f5f9;
    --text-secondary-dark: #cbd5e1;
    --border-color-dark: rgba(255, 255, 255, 0.1);
}
```

### Glass Colors
```css
:root {
    /* Glassmorphism Effects */
    --glass-bg: rgba(255, 255, 255, 0.1);
    --glass-border: rgba(255, 255, 255, 0.2);
    --glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
    --glass-backdrop: blur(8px);
    
    /* Dark Glass */
    --glass-bg-dark: rgba(0, 0, 0, 0.2);
    --glass-border-dark: rgba(255, 255, 255, 0.1);
    --glass-shadow-dark: 0 8px 32px rgba(0, 0, 0, 0.5);
}
```

## Typography

### Font Stack
```css
:root {
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    --font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
}
```

### Font Sizes
```css
:root {
    --text-xs: 0.75rem;    /* 12px */
    --text-sm: 0.875rem;   /* 14px */
    --text-base: 1rem;     /* 16px */
    --text-lg: 1.125rem;   /* 18px */
    --text-xl: 1.25rem;    /* 20px */
    --text-2xl: 1.5rem;    /* 24px */
    --text-3xl: 1.875rem;  /* 30px */
    --text-4xl: 2.25rem;   /* 36px */
    --text-5xl: 3rem;      /* 48px */
}
```

### Font Weights
```css
:root {
    --font-light: 300;
    --font-normal: 400;
    --font-medium: 500;
    --font-semibold: 600;
    --font-bold: 700;
}
```

## Spacing System

### Spacing Scale
```css
:root {
    --space-1: 0.25rem;   /* 4px */
    --space-2: 0.5rem;    /* 8px */
    --space-3: 0.75rem;   /* 12px */
    --space-4: 1rem;      /* 16px */
    --space-5: 1.25rem;   /* 20px */
    --space-6: 1.5rem;    /* 24px */
    --space-8: 2rem;      /* 32px */
    --space-10: 2.5rem;   /* 40px */
    --space-12: 3rem;     /* 48px */
    --space-16: 4rem;     /* 64px */
    --space-20: 5rem;     /* 80px */
}
```

## Component Styles

### Glass Card
```css
.glass-card {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-backdrop);
    border: 1px solid var(--glass-border);
    border-radius: 16px;
    box-shadow: var(--glass-shadow);
    padding: var(--space-6);
    transition: all 0.3s ease;
}

.glass-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(31, 38, 135, 0.5);
}
```

### Glass Button
```css
.glass-btn {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-backdrop);
    border: 1px solid var(--glass-border);
    border-radius: 12px;
    padding: var(--space-3) var(--space-6);
    color: var(--text-primary);
    font-weight: var(--font-medium);
    cursor: pointer;
    transition: all 0.3s ease;
}

.glass-btn:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
}

.glass-btn.primary {
    background: var(--primary-gradient);
    color: white;
    border: none;
}
```

### Glass Input
```css
.glass-input {
    background: var(--glass-bg);
    backdrop-filter: var(--glass-backdrop);
    border: 1px solid var(--glass-border);
    border-radius: 8px;
    padding: var(--space-3) var(--space-4);
    color: var(--text-primary);
    font-size: var(--text-base);
    transition: all 0.3s ease;
}

.glass-input:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}
```

## Layout System

### Grid System
```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-4);
}

.grid {
    display: grid;
    gap: var(--space-6);
}

.grid-cols-1 { grid-template-columns: repeat(1, 1fr); }
.grid-cols-2 { grid-template-columns: repeat(2, 1fr); }
.grid-cols-3 { grid-template-columns: repeat(3, 1fr); }
.grid-cols-4 { grid-template-columns: repeat(4, 1fr); }
```

### Flexbox Utilities
```css
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.items-center { align-items: center; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.flex-1 { flex: 1; }
```

## Animations

### Transitions
```css
:root {
    --transition-fast: 0.15s ease;
    --transition-normal: 0.3s ease;
    --transition-slow: 0.5s ease;
}
```

### Keyframes
```css
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}
```

### Animation Classes
```css
.animate-fade-in {
    animation: fadeIn 0.5s ease forwards;
}

.animate-slide-in {
    animation: slideIn 0.3s ease forwards;
}

.animate-pulse {
    animation: pulse 2s infinite;
}

.animate-float {
    animation: float 6s ease-in-out infinite;
}
```

## Responsive Design

### Breakpoints
```css
:root {
    --breakpoint-sm: 640px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1280px;
}
```

### Media Queries
```css
/* Mobile First Approach */
@media (min-width: 640px) {
    /* Small screens and up */
}

@media (min-width: 768px) {
    /* Medium screens and up */
}

@media (min-width: 1024px) {
    /* Large screens and up */
}

@media (min-width: 1280px) {
    /* Extra large screens and up */
}
```

## Dark Mode

### Theme Toggle
```css
[data-theme="dark"] {
    --bg-primary: var(--bg-primary-dark);
    --bg-secondary: var(--bg-secondary-dark);
    --text-primary: var(--text-primary-dark);
    --text-secondary: var(--text-secondary-dark);
    --glass-bg: var(--glass-bg-dark);
    --glass-border: var(--glass-border-dark);
    --glass-shadow: var(--glass-shadow-dark);
}
```

### Automatic Detection
```css
@media (prefers-color-scheme: dark) {
    :root {
        --bg-primary: var(--bg-primary-dark);
        --text-primary: var(--text-primary-dark);
        /* ... other dark theme variables */
    }
}
```

## Accessibility

### Focus States
```css
.focusable:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}

.glass-btn:focus-visible {
    outline: 2px solid #667eea;
    outline-offset: 2px;
}
```

### High Contrast Support
```css
@media (prefers-contrast: high) {
    .glass-card {
        border-width: 2px;
        background: rgba(255, 255, 255, 0.9);
    }
    
    .glass-btn {
        border-width: 2px;
        font-weight: var(--font-semibold);
    }
}
```

### Reduced Motion
```css
@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
```

## Usage Guidelines

### Do's ✅
- Use consistent spacing from the spacing scale
- Apply glassmorphism effects consistently
- Maintain proper contrast ratios
- Use semantic color meanings
- Follow responsive design patterns

### Don'ts ❌
- Don't use arbitrary spacing values
- Don't mix different glass effect styles
- Don't ignore accessibility requirements
- Don't use colors without semantic meaning
- Don't break responsive layouts