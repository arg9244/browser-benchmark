# 🌐 Browser Benchmark Analytics

A comprehensive performance comparison tool for web browsers. Built with React, TypeScript, and Tailwind CSS, this application provides detailed analytics and visualizations of browser performance metrics.

![Browser Benchmark](https://img.shields.io/badge/browser-benchmark-blue?style=for-the-badge)

## 🚀 Live Demo

View the live demo at: **[https://arg9244.github.io/browser-benchmark](https://arg9244.github.io/browser-benchmark)**

## 📊 Features

- **Comprehensive Browser Comparison**: Compare performance metrics across multiple browsers including Chrome, Firefox, Safari, Edge, and more
- **Interactive Visualizations**: Beautiful charts and radar graphs using Recharts and Framer Motion
- **Multiple Categories**: Performance analysis across various categories (Speed, Memory, Battery, etc.)
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Dark Theme**: Elegant dark interface with smooth animations
- **Real-time Data Loading**: Dynamic data fetching from JSON files

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, custom CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/arg9244/browser-benchmark.git

# Navigate to the project directory
cd browser-benchmark

# Install dependencies (using npm or bun)
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev
```

## 🏗️ Build

```bash
# Build for production
npm run build

# Preview the build
npm run preview
```

## 📝 Project Structure

```
browser-benchmark/
├── public/
│   └── data/          # Browser benchmark data files
├── src/
│   ├── components/    # React components
│   ├── data/          # Static data and configurations
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main application component
│   ├── main.tsx       # Entry point
│   ├── index.css      # Global styles
│   ├── theme.ts       # Theme configuration
│   └── types.ts       # TypeScript type definitions
├── dist/              # Build output (gitignored)
├── index.html         # HTML entry point
├── package.json       # Dependencies and scripts
├── tsconfig.json      # TypeScript configuration
├── vite.config.js     # Vite configuration
├── .gitignore         # Git ignore rules
├── LICENSE            # License file
└── README.md          # This file
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the [MIT License](LICENSE) - see the LICENSE file for details.

## 🙏 Acknowledgments

- Browser performance data sources
- React and Vite community
- Tailwind CSS for the beautiful styling

## 📞 Contact

For questions or support, please open an issue on the repository.