# Data Files Documentation

This directory contains JSON files that control all content displayed on the website. **All content is stored in these files - nothing is hardcoded in the JSX/TSX files.** Edit these files to update the site content.

## File Structure

### Core Data Files

- **`home.json`** - Home page content (bio, news, images, social links)
- **`publications.json`** - Publications page content (publications list, labels, statistics)
- **`projects.json`** - Research projects data
- **`art.json`** - Art gallery content (categories, images, labels)
- **`navigation.json`** - Navigation menu items
- **`page-config.json`** - Page titles and section labels

---

## `home.json` - Home Page

Contains all content for the homepage.

### Structure

```json
{
  "name": "Your Name",
  "pronunciation": "optional pronunciation",
  "title": "Your Title",
  "institution": "Institution Name",
  "greeting": "Hi, I am",
  "atLabel": "at",
  "sections": {
    "news": {
      "title": "News",
      "description": "Latest updates and announcements"
    },
    "researchAreas": {
      "title": "Research Areas"
    }
  },
  "images": {
    "profile": "URL or path to profile image",
    "researchAreas": "URL or path to research areas image"
  },
  "bio": [
    "First paragraph of bio",
    "Second paragraph of bio"
  ],
  "news": [
    {
      "text": "News item text. Use [ Link Text ] for links.",
      "date": "Optional date"
    }
  ],
  "social": {
    "email": "your.email@example.com",
    "linkedin": "https://linkedin.com/in/yourprofile",
    "googleScholar": "https://scholar.google.com/citations?user=YOUR_ID",
    "github": "https://github.com/yourusername",
    "twitter": "https://twitter.com/yourhandle",
    "orcid": "https://orcid.org/0000-0000-0000-0000"
  }
}
```

### Fields

- **`name`** - Your full name (displayed in heading)
- **`pronunciation`** - Optional pronunciation guide in parentheses
- **`title`** - Your job title or position
- **`institution`** - Institution or company name
- **`greeting`** - Greeting text (default: "Hi, I am")
- **`atLabel`** - Label between title and institution (default: "at")
- **`sections`** - Section titles and descriptions
  - **`news.title`** - News section title
  - **`news.description`** - News section description
  - **`researchAreas.title`** - Research Areas section title
- **`images`** - Image URLs or paths
  - **`profile`** - Profile picture URL/path
  - **`researchAreas`** - Research areas diagram URL/path (used in carousel)
- **`bio`** - Array of bio paragraphs (each string becomes a paragraph)
- **`news`** - Array of news items
  - **`text`** - News text (supports `[ Link Text ]` format for links)
  - **`date`** - Optional date string
- **`social`** - Social media and contact links (leave empty string to hide)

### Adding News Items

Use the format `[ Link Text ]` in news text to create clickable links. Multiple links can be separated: `[ Paper | Presentation ]`.

---

## `publications.json` - Publications Page

Contains publications list and all UI labels.

### Structure

```json
{
  "title": "Publications",
  "description": "Page description",
  "labels": {
    "statistics": {
      "totalPublications": "Total Publications",
      "totalCitations": "Total Citations",
      "avgCitations": "Avg Citations",
      "yearsActive": "Years Active"
    },
    "charts": {
      "citationsByYear": "Citations by Year",
      "publicationsByType": "Publications by Type"
    },
    "filters": {
      "title": "Filters",
      "type": "Type:",
      "year": "Year:",
      "all": "All",
      "allYears": "All Years",
      "withCitationsOnly": "With Citations Only"
    },
    "list": {
      "publication": "publication",
      "publications": "publications"
    }
  },
  "publications": [
    {
      "year": "2025",
      "type": "article",
      "title": "Publication Title",
      "venue": "Venue Name",
      "authors": "Author Name, et al.",
      "location": "Location (optional)",
      "citations": 15,
      "url": "#"
    }
  ]
}
```

### Fields

- **`title`** - Page title
- **`description`** - Page description (shown below title)
- **`labels`** - All UI labels for the page
  - **`statistics`** - Statistics card labels
  - **`charts`** - Chart titles
  - **`filters`** - Filter section labels
  - **`list`** - Publication count labels
- **`publications`** - Array of publication objects
  - **`year`** - Publication year (string)
  - **`type`** - "article" or "presentation"
  - **`title`** - Publication title
  - **`venue`** - Venue/conference/journal name
  - **`authors`** - Author list
  - **`location`** - Location (optional)
  - **`citations`** - Number of citations (number)
  - **`url`** - Link URL

### Publication Types

- **`article`** - Regular publication/article
- **`presentation`** - Presentation/talk (shows badge)

---

## `projects.json` - Research Projects

Contains research project data.

### Structure

```json
[
  {
    "id": "project-id",
    "period": "2024-",
    "title": "Project Title",
    "institution": "Institution Name",
    "description": "Project description. Use \\n for line breaks.",
    "image": "/images/project-image.jpg",
    "images": [
      {
        "src": "/images/image1.jpg",
        "alt": "Alt text",
        "caption": "Optional caption"
      }
    ],
    "funding": "Funding information (optional)",
    "publications": [
      {
        "type": "article",
        "title": "Publication Title",
        "venue": "Venue Name",
        "location": "Location (optional)",
        "year": "2025",
        "url": "#"
      }
    ]
  }
]
```

### Fields

- **`id`** - Unique identifier (used for URL fragments)
- **`period`** - Time period (e.g., "2024-", "2021-2023")
- **`title`** - Project title
- **`institution`** - Institution/University name
- **`description`** - Project description (use `\n` for line breaks)
- **`image`** - Single project image (optional)
- **`images`** - Array of multiple images (optional)
  - **`src`** - Image path/URL
  - **`alt`** - Alt text
  - **`caption`** - Optional caption
- **`funding`** - Funding information (optional)
- **`publications`** - Array of publications related to the project
  - **`type`** - "article", "presentation", or "link"
  - **`title`** - Publication title
  - **`venue`** - Venue name
  - **`location`** - Location (optional)
  - **`year`** - Year (optional)
  - **`url`** - Link URL

### Publication Types in Projects

- **`article`** - Regular publication
- **`presentation`** - Presentation (shows badge)
- **`link`** - External link (shows link icon)

---

## `art.json` - Art Gallery

Contains art gallery categories and images.

### Structure

```json
{
  "title": "AI-generated Images",
  "description": "Page description",
  "labels": {
    "categories": "Categories",
    "selectCategory": "Select a category above to view images.",
    "noImages": "No images available for this category yet.",
    "image": "image",
    "images": "images"
  },
  "categories": [
    {
      "name": "Category Name",
      "images": [
        {
          "src": "/images/art/image1.jpg",
          "alt": "Image description"
        }
      ]
    }
  ]
}
```

### Fields

- **`title`** - Page title
- **`description`** - Page description
- **`labels`** - UI labels
  - **`categories`** - Categories section title
  - **`selectCategory`** - Message when no category selected
  - **`noImages`** - Message when category has no images
  - **`image`** - Singular "image" label
  - **`images`** - Plural "images" label
- **`categories`** - Array of categories
  - **`name`** - Category name
  - **`images`** - Array of images
    - **`src`** - Image path/URL
    - **`alt`** - Alt text

---

## `page-config.json` - Page Configuration

Contains page titles and section labels.

### Structure

```json
{
  "projects": {
    "title": "Research Projects",
    "sections": {
      "presentationsArticles": "Presentations / Articles"
    }
  },
  "art": {
    "labels": {
      "categories": "Categories",
      "selectCategory": "Select a category above to view images.",
      "noImages": "No images available for this category yet.",
      "image": "image",
      "images": "images"
    }
  }
}
```

**Note:** Art labels are now in `art.json`, but this file can be used for other page-specific labels.

---

## `navigation.json` - Navigation Menu

Contains navigation menu items.

### Structure

```json
{
  "links": [
    {
      "title": "Home",
      "url": "/"
    },
    {
      "title": "Publications",
      "url": "/publications"
    },
    {
      "title": "Research Projects",
      "url": "/research/projects"
    },
    {
      "title": "Art",
      "url": "/art"
    }
  ]
}
```

### Fields

- **`links`** - Array of navigation items
  - **`title`** - Link text
  - **`url`** - URL path (internal) or full URL (external)

---

## Adding Images

### Home Page Images

1. Place images in `/public/images/` directory
2. Update `home.json` → `images` object with paths:
   - **Profile**: `"/images/profile.jpg"` or full URL
   - **Research Areas**: `"/images/research-areas.jpg"` or full URL

### Project Images

1. Place images in `/public/images/` directory
2. In `projects.json`, use paths like `"/images/project-name/image.jpg"`
3. For multiple images, use the `images` array

### Art Images

1. Place images in `/public/images/art/` directory (or organize by category)
2. In `art.json`, use paths like `"/images/art/image1.jpg"`

### Image Paths

- **Relative paths**: Start with `/` (e.g., `"/images/photo.jpg"`)
- **External URLs**: Use full URL (e.g., `"https://example.com/image.jpg"`)

---

## JSON Format Guidelines

1. **Valid JSON**: All files must be valid JSON
   - Use double quotes for strings
   - No trailing commas
   - Proper comma placement

2. **Line Breaks**: Use `\n` for line breaks in text fields

3. **Empty Fields**: Use empty string `""` to hide optional fields (e.g., social links)

4. **Arrays**: Use arrays for lists (bio paragraphs, news items, publications, etc.)

5. **Validation**: Use a JSON validator (VS Code, online tools) to check syntax before saving

---

## Editing Workflow

1. **Open the appropriate JSON file** in `data/` directory
2. **Make your changes** following the structure above
3. **Validate JSON** (most editors do this automatically)
4. **Save the file**
5. **View changes** - The site will automatically update (in development mode)

---

## Tips

- **Backup**: Keep backups of your JSON files
- **Test**: Always validate JSON before saving
- **Incremental**: Make small changes and test frequently
- **Consistency**: Keep formatting consistent across files
- **Comments**: JSON doesn't support comments - use documentation instead

---

## Need Help?

- Check this documentation first
- Validate JSON syntax if you encounter errors
- Review the structure of existing entries as examples
- All content should be in these files - never edit JSX/TSX files for content changes
