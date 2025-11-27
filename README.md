# ⚡ Harry Potter Explorer

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Material--UI-5.x-0081CB?style=for-the-badge&logo=mui&logoColor=white" alt="Material-UI" />
  <img src="https://img.shields.io/badge/Vite-5.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer--Motion-10.x-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/SCSS-1.69.0-CC6699?style=for-the-badge&logo=sass&logoColor=white" alt="SCSS" />
</div>

<div align="center">
  <h3>🏰 A modern, responsive React application for exploring the magical world of Harry Potter</h3>
  <p>Discover characters, spells, and create your own collection of favorite wizards and witches!</p>
</div>

---

## 🌟 Features

### 🧙‍♂️ **Character Explorer**

- Browse through **400+ characters** from the Harry Potter universe
- Detailed character profiles with images, house affiliations, and actor information
- **Search & Filter** by name, actor, or Hogwarts house
- **Pagination** with "Load More" functionality for smooth browsing

### 🪄 **Spells Compendium**

- Comprehensive spell database with descriptions
- Search through magical spells and incantations
- Paginated interface for easy navigation

### ❤️ **Favorites System**

- Save your favorite characters with local storage persistence
- Dedicated favorites page with character collection
- Real-time favorite counter in sidebar navigation

### 🎨 **Modern UI/UX**

- **Dark/Light Theme** toggle with smooth transitions
- **Responsive design** - works perfectly on desktop, tablet, and mobile
- **Glass morphism effects** and modern card designs
- **Smooth animations** powered by Framer Motion
- **Professional skeleton loaders** for better perceived performance

### ⚡ **Performance & Accessibility**

- Optimized with **React 18** and **Vite** for lightning-fast development
- **Lazy loading** and efficient re-rendering
- **Accessible design** with proper ARIA labels and keyboard navigation
- **Error boundaries** for graceful error handling

---

## 🛠️ Tech Stack

### **Frontend Framework**

- **React 18.2.0** - Modern React with hooks and concurrent features
- **React Router v6** - Client-side routing with nested layouts
- **Vite** - Next-generation frontend build tool for fast development

### **UI & Styling**

- **Material-UI (MUI)** - Professional React component library
- **SCSS** - Advanced CSS with variables, mixins, and modern features
- **Framer Motion** - Production-ready motion library for animations

### **State Management & Data**

- **Custom Hooks** - Modular state management (favorites, theme, pagination)
- **Axios** - HTTP client for API requests
- **Local Storage** - Persistent favorites and theme preferences

### **APIs**

- **Harry Potter API** - Public REST API for characters and spells
  - Characters: `https://hp-api.onrender.com/api/characters`
  - Spells: `https://hp-api.onrender.com/api/spells`

---

## 📦 Installation & Setup

### **Prerequisites**

- Node.js 16+ and npm (or yarn)
- Modern web browser

### **Quick Start**

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd react-test-task
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### **Available Scripts**

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

## 🏗️ Project Structure

```
src/
├── api/              # API integration layer
│   └── hpApi.js     # Harry Potter API helpers
├── components/       # Reusable UI components
│   ├── CharacterCard.jsx
│   ├── Sidebar.jsx
│   ├── ThemeToggle.jsx
│   └── SkeletonComponents.jsx
├── hooks/           # Custom React hooks
│   ├── useFavorites.js
│   ├── usePagination.js
│   ├── useTheme.jsx
│   └── useHarryPotter.js
├── layout/          # App layout components
│   └── MainLayout.jsx
├── pages/           # Route-based page components
│   ├── CharactersPage.jsx
│   ├── CharacterDetails.jsx
│   ├── SpellsPage.jsx
│   └── FavoritesPage.jsx
└── styles/          # SCSS styling
    └── simple.scss  # Main stylesheet with theme system
```

---

## 🎯 Key Features Breakdown

### **🔍 Advanced Search & Filtering**

- Real-time search across character names and actors
- House-based filtering (Gryffindor, Slytherin, Ravenclaw, Hufflepuff)
- Smart result counters and filter chips

### **📱 Responsive Design**

- Mobile-first approach with adaptive layouts
- Touch-friendly interfaces for mobile devices
- Optimized images and loading states

### **🎨 Theme System**

- Professional dark/light theme implementation
- CSS custom properties for consistent theming
- Smooth transitions with optimized performance
- User preference persistence

### **⚡ Performance Optimizations**

- Pagination to handle large datasets efficiently
- Memoized components and hooks to prevent unnecessary re-renders
- Skeleton loading states for better perceived performance
- Optimized bundle size with Vite

---

## 🚀 Deployment

### **Build for Production**

```bash
npm run build
```

### **Deploy Options**

- **Vercel**: Connect your GitHub repository for automatic deployments
- **Netlify**: Drag & drop the `dist` folder after building
- **GitHub Pages**: Use `gh-pages` package for easy deployment

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- **Harry Potter API** - For providing the magical data
- **Material-UI Team** - For the excellent component library
- **Framer Motion** - For smooth, professional animations
- **React Team** - For the amazing framework

---

<div align="center">
  <p>Built with ❤️ and ✨ Magic</p>
  <p>Perfect for portfolios, learning React, or just exploring the wizarding world!</p>
</div>
