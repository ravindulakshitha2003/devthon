# Tuora - AI Tourism Planner

A modern, AI-powered conversational tourism planning application built with React and Vite.

## 🎨 Design Features

- **Clean, Modern UI**: Gradient-based design with blue (#1F6AE1) to green (#1ABC9C) color scheme
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **Smooth Animations**: Fade-in effects and smooth transitions
- **Custom Logo**: SVG-based robot chat bubble logo

## 🚀 Pages Included

1. **Home/Landing Page** - Welcome screen with hero section and CTA
2. **Chat Interface** - Conversational planning with AI assistant
3. **Itinerary View** - Day-by-day travel plan with timeline
4. **Recommendations** - Explore restaurants, attractions, and hotels

## 📦 Installation

\`\`\`bash
# Navigate to project directory
cd tuora-app

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
\`\`\`

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **CSS3** - Styling with custom properties and animations
- **Inter Font** - Modern typography

## 📁 Project Structure

\`\`\`
tuora-app/
├── src/
│   ├── components/
│   │   └── Logo.jsx          # Reusable logo component
│   ├── pages/
│   │   ├── Home.jsx          # Landing page
│   │   ├── Home.css
│   │   ├── Chat.jsx          # Conversation interface
│   │   ├── Chat.css
│   │   ├── Itinerary.jsx    # Trip planning view
│   │   ├── Itinerary.css
│   │   ├── Recommendations.jsx  # Explore page
│   │   └── Recommendations.css
│   ├── App.jsx               # Main app with routing
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── index.html
├── package.json
└── vite.config.js
\`\`\`

## 🎯 Key Features

### Chat Interface
- Real-time message display
- Typing indicators
- Smooth auto-scrolling
- Gradient message bubbles

### Itinerary Planner
- Multi-day trip organization
- Timeline view with activities
- Time-based scheduling
- Edit and add functionality

### Recommendations
- Filterable content (All, Restaurants, Attractions, Hotels)
- Rating system
- Price indicators
- Add to plan functionality

## 🎨 Color Palette

- **Primary Blue**: #1F6AE1
- **Primary Green**: #1ABC9C
- **Text Dark**: #2C3E50
- **Text Gray**: #7F8C9A
- **Light Gray**: #F5F7FA
- **Border**: #E1E8ED

## 🌐 Routes

- `/` - Home page
- `/chat` - Chat interface
- `/itinerary` - Trip planner
- `/recommendations` - Explore recommendations

## 📱 Responsive Design

The application is fully responsive with breakpoints at:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🔧 Customization

To customize colors, edit the CSS variables in `src/index.css`:

\`\`\`css
:root {
  --primary-blue: #1F6AE1;
  --primary-green: #1ABC9C;
  /* ... other variables */
}
\`\`\`

## 📄 License

This project is created for demonstration purposes.

## 🤝 Contributing

Feel free to fork this project and customize it for your needs!
