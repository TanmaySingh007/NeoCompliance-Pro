# 🛡️ NeoCompliance-Pro

**NeoCompliance-Pro** is a modern, futuristic web application designed for intelligent ad compliance checking. Built with cutting-edge technologies including **React 19**, **TypeScript**, **Vite**, **TailwindCSS v3**, **ShadCN UI**, and **Framer Motion**, it delivers a sleek, performant, and developer-friendly experience with stunning 3D animations and AI-powered compliance analysis.

## 🌟 Live Demo

🔗 **[View Live Demo](https://neocompliance-pro7.netlify.app/)** - Experience the full application with all features

## 🚀 Features

- ⚡️ **Lightning-fast build** with **Vite 7**
- 🧠 **React 19** + **TypeScript** for type safety and modern development
- 🎨 **TailwindCSS v3** with custom design system and animations
- 🎞️ **Framer Motion** for smooth, professional animations
- 🎯 **ShadCN UI** components for consistent, accessible design
- 🔒 **Structured architecture** with scalable folder organization
- 📱 **Responsive design** that works on all devices
- 🎭 **3D Background animations** with interactive elements
- 📊 **Compliance analysis** with detailed reporting
- 📧 **Email integration** for sharing reports
- 📄 **PDF generation** for compliance documents
- 🤖 **AI-powered suggestions** for compliance improvements

## 📂 Project Structure

```
NeoCompliance-Pro/
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # ShadCN UI components
│   │   ├── Background3D.tsx # 3D animated background
│   │   ├── FileUploader.tsx # File upload component
│   │   ├── ComplianceReport.tsx # Report generation
│   │   └── ...              # Other components
│   ├── pages/               # Application pages
│   │   ├── HomePage.tsx     # Landing page
│   │   ├── CompliancePage.tsx # Main compliance page
│   │   └── NotFound.tsx     # 404 page
│   ├── contexts/            # React contexts
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utility functions
│   ├── data/                # Static data and configurations
│   ├── services/            # API services and integrations
│   └── main.tsx             # Application entry point
├── public/                  # Static assets
├── index.html               # HTML template
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── vite.config.ts           # Vite configuration
└── package.json             # Dependencies and scripts
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript
- **Build Tool**: Vite 7.1.5
- **Styling**: TailwindCSS v3.4.0
- **UI Components**: ShadCN UI + Radix UI
- **Animations**: Framer Motion 12.23.12
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **PDF Generation**: jsPDF
- **Email Service**: EmailJS

## 🧑‍💻 Getting Started

### Prerequisites

- **Node.js** (>=18.0.0) - [Download here](https://nodejs.org/)
- **npm** (>=8.0.0) or **yarn** (>=1.22.0)
- **Git** - [Download here](https://git-scm.com/)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/TanmaySingh007/NeoCompliance-Pro.git
   cd NeoCompliance-Pro
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:8080` to view the application

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

## 🎯 Usage

### 1. **Upload Advertisement**
- Drag and drop or click to upload your advertisement image
- Supports JPG, PNG, GIF, and other common formats
- Real-time preview of uploaded content

### 2. **Select Compliance Guidelines**
- Choose from various compliance standards
- Customize guidelines for your specific needs
- Get detailed information about each standard

### 3. **AI-Powered Analysis**
- Advanced compliance checking algorithms
- Real-time analysis of your advertisement
- Detailed compliance scoring and feedback

### 4. **Generate Reports**
- Comprehensive compliance reports
- Download as PDF for documentation
- Email reports to stakeholders
- Share reports via direct links

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# EmailJS Configuration (optional)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# API Configuration (optional)
VITE_API_BASE_URL=your_api_url
```

### TailwindCSS Configuration

The project uses a custom TailwindCSS configuration with:
- Custom color palette
- Extended animations
- Responsive breakpoints
- Dark mode support

## 🚀 Deployment

### Netlify (Recommended)

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Deploy!

### Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

### Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Upload the `dist` folder** to your hosting provider

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes:**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch:**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Use meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed
- Follow the existing code style

## 🐛 Troubleshooting

### Common Issues

**Port 8080 already in use:**
```bash
# Kill the process using port 8080
npx kill-port 8080
# or
lsof -ti:8080 | xargs kill -9
```

**Dependencies not installing:**
```bash
# Clear npm cache
npm cache clean --force
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**TailwindCSS not working:**
```bash
# Ensure PostCSS is configured correctly
npm install -D tailwindcss@^3.4.0 postcss autoprefixer
```

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **ShadCN UI** for the beautiful component library
- **Framer Motion** for smooth animations
- **TailwindCSS** for the utility-first CSS framework
- **Vite** for the lightning-fast build tool
- **React** team for the amazing framework

## 📞 Support

If you have any questions or need help:

- 📧 **Email**: [Your Email]
- 💼 **LinkedIn**: [Tanmay Singh](https://www.linkedin.com/in/tanmay-singh-228097272/)
- 🐛 **Issues**: [GitHub Issues](https://github.com/TanmaySingh007/NeoCompliance-Pro/issues)

---

<div align="center">

**Built with ❤️ by [Tanmay Singh](https://www.linkedin.com/in/tanmay-singh-228097272/)**

⭐ **Star this repository if you found it helpful!**

</div>