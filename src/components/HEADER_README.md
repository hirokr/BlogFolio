# Modern Header Component

A beautiful, modern header component with smooth GSAP animations for your portfolio website.

## Features

### 🎨 Design

- **Glass morphism effect** - Transparent background that becomes blurred and solid on scroll
- **Gradient accents** - Beautiful gradient logo and CTA button with shine effect
- **Responsive design** - Fully responsive with mobile menu
- **Modern UI** - Clean, minimalist design with smooth shadows and borders

### ✨ Animations

#### Initial Load Animations

- Header slides down from top with fade-in
- Logo slides in from left with scale effect
- Navigation items cascade in from top with stagger
- CTA button slides in from right with scale effect

#### Scroll Animations

- Header background changes from transparent to blurred on scroll
- Progress bar fills as user scrolls down the page
- Smooth scroll behavior with GSAP ScrollTrigger

#### Hover Animations

- Logo: Scale and rotate effect on hover
- Nav items: Underline animation that grows from left to right
- CTA button: Shine effect that sweeps across on hover
- All animations use smooth easing functions

#### Mobile Menu Animations

- Overlay fades in smoothly
- Menu slides in from right with elastic easing
- Menu items cascade in with stagger effect
- Smooth slide-out when closing

### 🎯 Features

#### Navigation

- Home link with scroll to top
- Section links (About, Works, Blog, Contact) with smooth scroll
- Blog page link
- Mobile-responsive menu

#### Interactions

- Smooth scroll to sections using GSAP ScrollToPlugin
- Click outside to close mobile menu
- Automatic menu close on navigation
- Keyboard accessible

#### Visual Effects

- Dynamic shadow based on scroll position
- Gradient progress bar
- Icon-based navigation for better UX
- Glassmorphism backdrop blur effect

## Technical Details

### Dependencies

- **GSAP** - Animation library
- **GSAP ScrollTrigger** - Scroll-based animations
- **GSAP ScrollToPlugin** - Smooth scrolling
- **Lucide React** - Icon library
- **Next.js** - React framework
- **Tailwind CSS** - Utility-first CSS

### Animation Timing

- Initial animations: 0.8s with stagger delays
- Hover effects: 0.3s
- Mobile menu: 0.5s with 0.1s stagger
- Scroll animations: Tied to scroll progress

### Performance

- Uses GSAP Context for proper cleanup
- Minimal re-renders with React refs
- Optimized animations with hardware acceleration
- Responsive breakpoints for mobile/desktop

## Usage

The header is automatically included in:

- Home page (`/`)
- Blog listing page (`/blogs`)
- Individual blog posts (`/blogs/[slug]`)

### Section IDs for Smooth Scroll

Make sure your page sections have the following IDs:

- `#about` - About section
- `#works` - Works/Portfolio section
- `#contact` - Contact section

## Customization

### Colors

The header uses CSS variables from your theme:

- `--accent` - Primary accent color
- `--foreground-secondary` - Secondary accent color
- `--background` - Background color
- `--foreground` - Text color

### Animation Speeds

Adjust animation durations in the component:

```typescript
// Initial animation
duration: 0.8; // Slower/faster initial load

// Hover effects
duration: 0.3; // Quicker hover responses

// Mobile menu
duration: 0.5; // Menu slide timing
```

### Styling

The component uses Tailwind CSS classes. Customize by modifying the className props or adding custom CSS.

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (with webkit prefixes for backdrop-filter)
- Mobile browsers: Full support

## Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Focus indicators on interactive elements
