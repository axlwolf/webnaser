# Look & Feel Guide for Grupo Naser Modernized Website

This guide outlines the design principles and Tailwind CSS configurations to maintain the visual identity of the original Grupo Naser website, which was based on Bootstrap, in the modernized Next.js application. The goal is to replicate the aesthetic and user experience using Tailwind CSS utilities while leveraging the benefits of a modern framework.

## Color Palette

The original site uses a distinct color scheme that reflects the brand identity. Below are the primary colors extracted from the CSS, along with corresponding Tailwind CSS classes or custom configurations:

- **Primary Background/Dark Color**: `#524030` (A dark brown used for headers, footers, and buttons)
  - Tailwind Approximation: `bg-amber-900` or custom `bg-[#524030]`
- **Accent Color**: `#cfbfaa` (A light gold/beige used for highlights, hover effects, and text accents)
  - Tailwind Approximation: `bg-amber-200` or custom `bg-[#cfbfaa]` for backgrounds, `text-amber-200` for text
- **Text and Neutral Backgrounds**: 
  - Dark Text: `#666666` (General text color) - Tailwind: `text-gray-600`
  - Light Background: `#f4f4f4` (Used for content sections) - Tailwind: `bg-gray-100`
- **White**: `#ffffff` (Used for text on dark backgrounds and button hover effects) - Tailwind: `bg-white` or `text-white`

### Custom Tailwind Configuration (if needed)
To precisely match the original colors, extend the Tailwind configuration in `tailwind.config.ts`:

```typescript
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        naserDark: '#524030',
        naserAccent: '#cfbfaa',
      },
    },
  },
  plugins: [],
};
```

Usage: `bg-naserDark`, `text-naserAccent`, etc.

## Typography

The original site uses the 'Poppins' font family with specific font sizes and weights to create a professional and readable design.

- **Font Family**: 'Poppins', sans-serif
  - Tailwind: Add to `tailwind.config.ts` or use a custom CSS class if not available in Tailwind by default.
- **Headings**:
  - `h1` to `h6`: No margin (`m-0`), with specific sizes in the original CSS.
  - Example: `h2` at 36px for section headings - Tailwind: `text-4xl` (approximation)
  - Font Weight: Often 600 or 700 - Tailwind: `font-semibold` or `font-bold`
- **Paragraphs**: 16px, line-height 24px, color `#666666` - Tailwind: `text-base`, `leading-6`, `text-gray-600`
- **Accented Text**: Often in `#cfbfaa` for emphasis - Tailwind: `text-amber-200` or custom `text-naserAccent`

### Custom Font Configuration
If 'Poppins' is not loaded by default, include it via Google Fonts in `layout.tsx` or a global CSS file:

```html
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet">
```

And in `tailwind.config.ts`:

```typescript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
};
```

Usage: `font-poppins`

## Layout and Spacing

The original site uses a container width of 1200px with consistent padding and margins for spacing.

- **Container**: Max-width 1200px - Tailwind: `container mx-auto px-4` (adjust `max-w-6xl` if needed)
- **Section Padding**: Often 140px top/bottom for major sections - Tailwind: `py-36`
- **Margin Between Elements**: Commonly 30px or 15px - Tailwind: `my-8` or `my-4`
- **Section Headings Margin**: 80px bottom - Tailwind: `mb-20`

## Buttons

Buttons in the original site have distinct styles for primary and border variants.

- **Filled Button**: Background `#524030`, white text, uppercase, rounded (30px radius)
  - Tailwind: `bg-amber-900 text-white uppercase font-bold py-3 px-8 rounded-full hover:bg-white hover:text-amber-200 transition duration-300`
- **Border Button**: Transparent background, white border, white text, uppercase
  - Tailwind: `bg-transparent border-2 border-white text-white uppercase font-bold py-2.5 px-7 rounded-full hover:bg-white hover:text-amber-200 transition duration-300`

## Header and Navigation

- **Sub-Header**: Dark background (`#524030`), white text, social icons on the right
  - Tailwind: `bg-amber-900 text-white py-2.5`
- **Main Header**: Initially transparent, becomes white with shadow on scroll
  - Tailwind: `bg-transparent absolute w-full z-50 transition-all duration-300` and `bg-white shadow-md fixed top-0` on scroll
  - Nav Links: White text initially, dark text (`#524030`) on scroll - Tailwind: `text-white` and `text-amber-900`
  - Active/Hover: Accent color (`#cfbfaa`) with bottom border - Tailwind: `hover:text-amber-200 border-b-2 border-amber-200`

## Footer

- **Main Footer**: Dark background (`#524030`), white text, multi-column layout
  - Tailwind: `bg-amber-900 text-white py-20`
- **Sub-Footer**: Darker background (`#343434`), centered text
  - Tailwind: `bg-gray-800 text-white py-6 text-center`

## Components and Cards

- **Service Items and Cards**: Often have a light gray background (`#f4f4f4`), padding, and shadow
  - Tailwind: `bg-gray-100 p-6 rounded-lg shadow-md`
- **Testimonials**: White background within a gray container, centered text
  - Tailwind: `bg-white p-6 rounded-lg shadow-md text-center`

## Responsive Design

The original site uses media queries for responsive adjustments at 768px and 992px breakpoints.

- **Mobile (max-width: 768px)**: Stack elements, hide sub-header, adjust font sizes
  - Tailwind: Use `md:` prefixes for changes above 768px, e.g., `md:flex hidden` to hide on mobile
- **Tablet to Desktop (max-width: 992px)**: Adjust navigation to a hamburger menu
  - Tailwind: Use `lg:` prefixes for changes above 1024px, e.g., `lg:flex hidden` for nav items

## Imagery and Backgrounds

- **Background Images**: Used for banners and specific sections with overlay for text readability
  - Tailwind: `bg-cover bg-center bg-no-repeat bg-[url('/path/to/image.jpg')]`
  - Overlay: `bg-black bg-opacity-50`
- **Image Handling**: Ensure images are responsive - Tailwind: `w-full h-auto object-cover`

## Interactive Elements

- **Hover Effects**: Smooth transitions for buttons, links, and images
  - Tailwind: `transition duration-300 hover:opacity-75` or specific color changes
- **Animations**: Used in sliders (e.g., fadeIn, fadeOut)
  - Implement custom animations or use libraries like Framer Motion for similar effects.

## Summary

This guide provides a mapping of the original Bootstrap-based design to Tailwind CSS utilities, ensuring the modernized Grupo Naser website retains its visual identity. Key areas to focus on include:
- Consistent use of the color palette with custom extensions if needed.
- Typography settings to match 'Poppins' with appropriate weights and sizes.
- Layout spacing and responsive design to mirror the original structure.
- Component styling for buttons, headers, footers, and cards to maintain brand consistency.

By adhering to these guidelines, the modern site will reflect the original look & feel while benefiting from Tailwind's utility-first approach and Next.js's performance optimizations.
