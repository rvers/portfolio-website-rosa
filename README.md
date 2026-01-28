# Research Portfolio - Next.js

A dynamic, file-based portfolio website built with Next.js for showcasing research projects and publications. Inspired by [jonaso.de/research/projects](https://www.jonaso.de/research/projects/).

## Features

- ✅ Built with Next.js 14 (App Router)
- ✅ Dynamic content loading from JSON files
- ✅ Easy-to-edit project data
- ✅ Clean, academic-style design
- ✅ Responsive layout
- ✅ Image support for projects and graphs
- ✅ Publication listings with links
- ✅ All pages: Home, Publications, Research Interests, Research Projects, Art

## Project Structure

```
portfolio-rosa/
├── app/
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── publications/
│   │   └── page.tsx            # Publications page
│   ├── research/
│   │   ├── interests/
│   │   │   └── page.tsx        # Research Interests page
│   │   └── projects/
│   │       └── page.tsx        # Research Projects page
│   └── art/
│       └── page.tsx            # Art page
├── components/
│   └── Navigation.tsx          # Navigation component
├── data/
│   ├── projects.json           # Project data (EDIT THIS TO UPDATE CONTENT)
│   ├── publications.json       # Publications data
│   ├── interests.json          # Research interests data
│   ├── home.json               # Home page data
│   ├── art.json                # Art gallery data
│   └── navigation.json         # Navigation menu items
├── public/
│   └── images/                 # Place project images here
├── package.json
└── next.config.js
```

## Getting Started

### Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## Editing Content

All content is managed through JSON files in the `data/` directory:

### Projects (`data/projects.json`)

Edit this file to add, update, or remove research projects:

```json
{
  "id": "project-id",
  "period": "2024-",
  "title": "Project Title",
  "institution": "University Name",
  "description": "Project description...",
  "image": "/images/project-image.jpg",
  "funding": "Funded by...",
  "publications": [
    {
      "type": "article",
      "title": "Publication Title",
      "venue": "Journal Name",
      "year": "2024",
      "url": "https://example.com"
    }
  ]
}
```

### Adding Images

1. Place images in the `public/images/` folder
2. Reference them in your JSON files using paths starting with `/images/`:
   ```json
   {
     "image": "/images/meta-hci/project-image.jpg"
   }
   ```
   Or for multiple images with captions:
   ```json
   {
     "images": [
       {
         "src": "/images/graph1.png",
         "alt": "Research results graph",
         "caption": "Figure 1: Research results"
       }
     ]
   }
   ```

### Other Content Files

- `data/home.json` - Home page content (name, bio, news)
- `data/publications.json` - Publications list
- `data/interests.json` - Research interests
- `data/art.json` - Art gallery categories and images
- `data/navigation.json` - Navigation menu items

## Pages

The site includes all pages matching the original structure:

- `/` - Home page
- `/publications` - Publications list
- `/research/interests` - Research interests
- `/research/projects` - Research projects
- `/art` - AI-generated art gallery

## Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

Or use the Vercel CLI:

```bash
npm i -g vercel
vercel
```

### Deploy on Netlify

1. Build the site: `npm run build`
2. Deploy the `.next` folder or connect your Git repository
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Deploy on Other Platforms

Next.js can be deployed on any platform that supports Node.js. Make sure to:

1. Set `NODE_ENV=production`
2. Run `npm run build`
3. Run `npm start` or use the platform's Node.js runtime

## Customization

### Colors and Styling

Edit CSS variables in `app/globals.css`:

```css
:root {
  --primary-color: #1a1a1a;
  --link-color: #0066cc;
  /* ... */
}
```

### Layout

Modify components in:
- `app/layout.tsx` - Root layout
- `components/Navigation.tsx` - Navigation component
- Individual page files in `app/`

## License

MIT License - Feel free to use this template for your own portfolio.
