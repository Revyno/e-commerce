# Shopz - E-Commerce Platform

A modern, responsive e-commerce platform built with Next.js 16, featuring product browsing, cart functionality, and wishlist management.

## 🚀 Features

- **Product Catalog**: Browse products by categories with pagination
- **Product Details**: Detailed product pages with specifications
- **Shopping Cart**: Add/remove items, quantity management
- **Wishlist**: Save favorite products for later
- **Responsive Design**: Optimized for mobile and desktop
- **Dark/Light Theme**: Theme switching support
- **Modern UI**: Built with shadcn/ui components
- **TypeScript**: Full type safety
- **Performance**: Optimized with Next.js App Router

## 🛠️ Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **State Management**: React hooks + Context
- **Data Fetching**: SWR
- **Analytics**: Vercel Analytics
- **Deployment**: Vercel

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
e-commerce/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── product/[id]/      # Dynamic product pages
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── navbar.tsx        # Navigation bar
│   ├── footer.tsx        # Footer
│   ├── product-card.tsx  # Product card component
│   └── ...
├── hooks/                # Custom React hooks
│   ├── use-cart.ts       # Cart management
│   ├── use-wishlist.ts   # Wishlist management
│   └── ...
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Additional styles
```

## 🎨 Customization

### Icons
- Favicon and Apple touch icon can be updated in `public/` directory
- Update icon paths in `app/layout.tsx`

### Theme
- Theme configuration in `components/theme-provider.tsx`
- Uses `next-themes` for theme switching

### API
- Currently uses [DummyJSON](https://dummyjson.com/) for mock data
- Replace API calls in components to connect to your backend

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 knowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [DummyJSON](https://dummyjson.com/) - Mock API data
