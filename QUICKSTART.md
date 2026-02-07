# Quick Start Guide

## Option 1: Using npm (Recommended)

```bash
cd tuora-app
npm install
npm run dev
```

Then open your browser to `http://localhost:5173`

## Option 2: Manual Setup

If you encounter network issues, you can still view the code structure and customize it:

1. All component files are in `src/pages/` and `src/components/`
2. Styles are co-located with components (e.g., `Home.css` with `Home.jsx`)
3. Global styles are in `src/index.css`

## Routes

Once running, you can navigate to:

- **/** - Landing page
- **/chat** - Chat interface  
- **/itinerary** - Trip planner
- **/recommendations** - Explore page

## Key Files

- `src/App.jsx` - Main router configuration
- `src/components/Logo.jsx` - Reusable logo component
- `src/pages/Home.jsx` - Landing page
- `src/pages/Chat.jsx` - Conversational interface
- `src/pages/Itinerary.jsx` - Day planner
- `src/pages/Recommendations.jsx` - Activity explorer

## Customization Tips

1. **Colors**: Edit CSS variables in `src/index.css`
2. **Logo**: Modify SVG in `src/components/Logo.jsx`
3. **Content**: Update data objects in page components
4. **Styling**: Each page has its own CSS file

Enjoy building with Tuora! 🚀
