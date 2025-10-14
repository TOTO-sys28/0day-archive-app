# 0day.sigma Archive

A modern, full-stack web application for browsing the legendary 0day.today exploit archive. Built with Next.js 15, TypeScript, and Tailwind CSS, featuring a beautiful Claude-inspired theme with particle effects.

![0day.sigma Archive](https://img.shields.io/badge/Next.js-15.5.5-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

- **📚 Complete Archive**: Browse 39,408+ historical exploits from 1996-2025
- **🔍 Advanced Search**: Real-time search across titles, authors, CVEs, and content
- **🏷️ Smart Filtering**: Filter by category, year, author, and CVE
- **📄 Pagination**: Efficient server-side pagination (50 items per page)
- **💾 Download System**: Download individual exploits or entire pages
- **🎨 Beautiful UI**: Claude-inspired warm theme with particle effects
- **📱 Responsive**: Mobile-friendly design with adaptive layouts
- **⚡ Performance**: Optimized loading with server-side processing
- **🔒 Educational**: Proper disclaimers and educational use warnings


## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Data**: JSON-based with server-side processing
- **Deployment**: Vercel (recommended) or GitHub Pages
- **Icons**: Lucide React

## 📦 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/0day-archive-app.git
   cd 0day-archive-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the data**
   ```bash
   # The data files should already be in public/data/
   # If not, run the aggregation script:
   node scripts/aggregate-data.js
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
0day-archive-app/
├── public/
│   └── data/
│       ├── exploits.json      # Aggregated exploit data
│       └── stats.json         # Archive statistics
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── exploits/      # API routes
│   │   ├── exploit/[id]/      # Exploit detail pages
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Homepage
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── ExploitTable.tsx   # Main data table
│   │   ├── FilterPanel.tsx    # Filter sidebar
│   │   ├── SearchBar.tsx      # Search component
│   │   ├── StatsPanel.tsx     # Statistics display
│   │   ├── ParticleBackground.tsx # Animated particles
│   │   └── LoadingSkeleton.tsx # Loading states
│   ├── hooks/
│   │   ├── useExploits.ts     # Main data hook
│   │   └── useExploit.ts      # Single exploit hook
│   └── lib/
│       ├── data.ts            # Data utilities
│       ├── types.ts           # TypeScript types
│       └── download.ts        # Download functionality
├── scripts/
│   └── aggregate-data.js      # Data processing script
└── README.md
```


## 📊 Performance

- **Initial Load**: ~2-3 seconds (50 exploits)
- **Search**: <100ms (server-side filtering)
- **Pagination**: Instant (pre-loaded data)
- **Detail Pages**: <200ms (individual API calls)
- **Memory Usage**: ~50MB (vs 500MB+ for full dataset)

## 🛡️ Security & Legal

### Educational Use Only

This application is designed for educational and research purposes only. Users are responsible for:

- Complying with all applicable laws and regulations
- Using exploits only in authorized environments
- Respecting responsible disclosure practices
- Not using exploits for malicious purposes

### Data Source

- **Original Source**: 0day.today archive (1996-2025)
- **Data Processing**: Aggregated and optimized for web display
- **Attribution**: FullHunt - The Next Generation Attack Surface Management Platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Original Archive**: 0day.today / milw0rm community
- **Data Provider**: FullHunt
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Framework**: Next.js team

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/TOTO-sys28/0day-archive-app/issues) page
2. Create a new issue with detailed information
3. Contact: [your-email@example.com](mailto:TOTOBOBDOD1@proton.me)

## 🔄 Changelog

### v1.0.0 (2025-01-14)
- Initial release
- Complete archive browsing (39,408 exploits)
- Advanced search and filtering
- Download functionality
- Responsive design
- Particle effects
- Performance optimizations

---

**⚠️ Disclaimer**: This tool is for educational and authorized security research only. Users are responsible for complying with all applicable laws and regulations.
