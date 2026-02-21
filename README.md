# 🤖 AI Tools Dashboard - Technoda

**Modern React-based AI tools dashboard for Technoda students (ages 9-14)**

A clean, responsive, Hebrew-friendly web application featuring 25+ AI tools organized by 10 subject categories with powerful search functionality.

## ✨ Features

- **10 Subject Tabs**: Chatbots, Translation, Games, Images, 3D Models, Music, Game Creation, Learning, Web Dev, Content, Robotics, Hosting
- **25+ AI Tools**: Each with Hebrew descriptions
- **Smart Search**: Real-time search across all tools
- **Google Fallback**: Automatically searches Google if tool not found
- **Floating Help Button**: On-screen usage instructions
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Dark Mode Support**: Automatic detection from system settings
- **Fast Performance**: Built with Vite for instant HMR
- **Minimal Scrolling**: Tab-based interface keeps content visible

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Opens at `http://localhost:5173/`

### 3. Build for Production
```bash
npm run build
```
Creates optimized `/dist` folder

## 📁 Project Structure

```
help-guid/
├── src/
│   ├── components/          # React components
│   │   ├── SearchBar.jsx
│   │   ├── SearchBar.css
│   │   ├── Tabs.jsx
│   │   ├── Tabs.css
│   │   ├── ToolsGrid.jsx
│   │   ├── ToolsGrid.css
│   │   ├── ToolCard.jsx
│   │   ├── ToolCard.css
│   │   ├── FloatingHelpButton.jsx
│   │   └── FloatingHelpButton.css
│   ├── data/
│   │   └── tools.js         # All tools data (10 subjects x 25+ tools)
│   ├── App.jsx              # Main app component
│   ├── App.css              # App styles
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles & CSS variables
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── package.json
└── README.md
```

## 🛠️ Technologies

- **React 18.2** - UI framework
- **Vite 5.0** - Build tool & dev server
- **CSS3** - Responsive grid & flexbox
- **ES6+** - Modern JavaScript

## 🌍 Language Support

- ✅ Full Hebrew right-to-left (RTL) support
- ✅ Responsive text alignment
- ✅ Hebrew font optimization

## 📱 Responsive Breakpoints

- **Mobile**: 480px and below
- **Tablet**: 768px to 1023px
- **Desktop**: 1024px and above

## 🎨 Component Overview

| Component | Purpose |
|-----------|---------|
| **SearchBar** | Search input with Google fallback |
| **Tabs** | Subject navigation (10 tabs) |
| **ToolsGrid** | Responsive grid container |
| **ToolCard** | Individual tool card (clickable) |
| **FloatingHelpButton** | Help modal with instructions |

## 📊 Tools Organization

Tools are organized into 10 subjects:
1. 💬 **Chatbots** - ChatGPT, Claude, Google Gemini, Grok
2. 🌍 **Translation** - Google Translate
3. 🎮 **Games** - Real or Fakes, Quick Draw, Human or Not, etc.
4. 🎨 **Image Tools** - Leonardo AI, FocalML, Kling AI
5. 🎭 **3D Models** - Sketchfab, Tripo3D Studio
6. 🎵 **Music** - Suno AI
7. 🕹️ **Game Creation** - Jabali Studio, Rosebud AI
8. 📖 **Learning** - NotebookLM, Teachable Machine
9. 💻 **Web Dev** - JSFiddle
10. 📊 **Presentations** - Gamma
11. 📱 **Content** - Kapwing
12. 🤖 **Robotics** - Micro:bit, LEGO Spike
13. 🌐 **Hosting** - PageDrop, EdgeOne Pages

## 🎯 Usage

### For Students
1. Open the app
2. Click on subject tabs to browse tools
3. Use the search bar to find specific tools
4. Click tool card to open in new tab
5. Click help button (?) for instructions

### For Teachers
- Share the app URL with students
- All tools open in new tabs (safe browsing)
- No login required
- Works offline with Service Worker support

## 📦 Deployment Options

### GitHub Pages
```bash
npm run build
# Commit & push /dist folder to gh-pages branch
```

### Vercel
```bash
npm install -g vercel
vercel
```

### Other Hosting
Any static host (Netlify, Surge, etc.) - just deploy the `/dist` folder

## 🔧 Development

### Add New Tool
1. Open `src/data/tools.js`
2. Add to subject array:
```javascript
{
  name: 'Tool Name',
  hebrew: 'תיאור בעברית',
  url: 'https://...',
  icon: '🎨'
}
```

### Customize Colors
Edit CSS variables in `src/index.css`:
```css
:root {
  --primary: #4f46e5;
  --secondary: #ec4899;
  /* etc */
}
```

### Add New Subject
1. Update `src/data/tools.js` 
2. Add subject to `toolsData` object
3. Component automatically updates

## ✅ Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📄 License

Created for Technoda educational program

## 🎓 Credits

Built with ❤️ for Technoda students learning about AI tools and technologies.
