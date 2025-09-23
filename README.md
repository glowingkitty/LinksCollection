# LinksCollection

A beautiful, modern Linktree-like website built with Next.js and Tailwind CSS. Perfect for showcasing your social media links, portfolio, and contact information.

## ✨ Features

- 🎨 **Modern Design**: Beautiful gradient background with glass morphism effects
- 📱 **Responsive**: Works perfectly on all devices (mobile, tablet, desktop)
- 🔗 **Easy Configuration**: Manage all links through environment variables
- 🚀 **Vercel Ready**: Optimized for easy deployment on Vercel
- 🛡️ **Open Source Safe**: No sensitive data in the codebase
- ⚡ **Fast Loading**: Built with Next.js for optimal performance
- 🎯 **SEO Optimized**: Proper meta tags and Open Graph support

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Your Profile

Copy the example environment file and customize it:

```bash
cp env.example .env.local
```

Edit `.env.local` with your information:

```env
# Profile Configuration
NEXT_PUBLIC_PROFILE_NAME="Your Name"
NEXT_PUBLIC_PROFILE_BIO="Your bio or description"
NEXT_PUBLIC_PROFILE_IMAGE="https://example.com/your-image.jpg"

# Links Configuration (JSON format)
NEXT_PUBLIC_LINKS='[
  {
    "title": "GitHub",
    "url": "https://github.com/yourusername",
    "icon": "🐙"
  },
  {
    "title": "Twitter", 
    "url": "https://twitter.com/yourusername",
    "icon": "🐦"
  },
  {
    "title": "LinkedIn",
    "url": "https://linkedin.com/in/yourusername", 
    "icon": "💼"
  }
]'
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site!

## 🎨 Customization

### Profile Image
- Use a square image (recommended: 400x400px or larger)
- Supports any image format (JPG, PNG, WebP, etc.)
- Can be hosted anywhere (GitHub, Imgur, your own server)

### Links Configuration
Each link supports:
- `title`: Display name for the link
- `url`: The destination URL
- `icon`: Optional emoji or icon (supports any emoji)

### Styling
The site uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Animations in `app/globals.css`
- Layout in `app/page.tsx`

## 🚀 Deployment on Vercel

### Option 1: Deploy from GitHub

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Option 2: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_PROFILE_NAME
vercel env add NEXT_PUBLIC_PROFILE_BIO
vercel env add NEXT_PUBLIC_PROFILE_IMAGE
vercel env add NEXT_PUBLIC_LINKS
```

### Environment Variables in Vercel

In your Vercel dashboard, add these environment variables:

- `NEXT_PUBLIC_PROFILE_NAME`: Your name
- `NEXT_PUBLIC_PROFILE_BIO`: Your bio
- `NEXT_PUBLIC_PROFILE_IMAGE`: URL to your profile image
- `NEXT_PUBLIC_LINKS`: JSON string of your links

## 📁 Project Structure

```
LinksCollection/
├── app/
│   ├── globals.css          # Global styles and Tailwind CSS
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page component
├── public/
│   └── default-avatar.png  # Default profile image
├── env.example             # Environment variables template
├── next.config.js          # Next.js configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── vercel.json             # Vercel deployment configuration
└── package.json            # Dependencies and scripts
```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Adding New Features

The codebase is structured for easy extension:

1. **New Link Types**: Add them to the `LinkData` interface
2. **Custom Styling**: Modify `app/globals.css` or `tailwind.config.js`
3. **Analytics**: Add tracking in the `handleLinkClick` function
4. **New Pages**: Add them to the `app/` directory

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)
- Inspired by [Linktree](https://linktr.ee/)

---

**Happy linking! 🔗**
