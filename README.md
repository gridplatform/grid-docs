# Grid Docs

![Grid Banner](readme-assets/banner.png)

> **Comprehensive documentation for Grid Platform** - Everything you need to know about the Infrastructure Orchestration Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Docusaurus](https://img.shields.io/badge/Docusaurus-2CA5E0?logo=docusaurus&logoColor=white)](https://docusaurus.io/)
[![Markdown](https://img.shields.io/badge/Markdown-000000?logo=markdown&logoColor=white)](https://www.markdown.org/)

## 🎯 Overview

Grid Docs is the central documentation hub for the Grid Infrastructure Orchestration Platform. Built with Docusaurus, it provides comprehensive guides, API references, tutorials, and best practices for using Grid Platform effectively.

## ✨ Key Features

- **📚 Comprehensive Guides**: Step-by-step tutorials and guides
- **🔍 Search**: Full-text search across all documentation
- **📱 Responsive**: Works perfectly on all devices
- **🌙 Dark Mode**: Built-in dark/light theme support
- **🔗 Interactive**: Live code examples and interactive demos
- **📊 API Reference**: Complete API documentation with examples
- **🎯 Quick Start**: Get up and running in minutes
- **🤝 Community**: Contributing guides and community resources

## 🏗️ Documentation Structure

```
grid-docs/
├── docs/                      # Main documentation
│   ├── getting-started/       # Quick start guides
│   ├── user-guide/           # User documentation
│   ├── api-reference/        # API documentation
│   ├── tutorials/            # Step-by-step tutorials
│   ├── best-practices/       # Best practices and patterns
│   ├── troubleshooting/      # Common issues and solutions
│   └── contributing/         # Contributing guidelines
├── blog/                     # Blog posts and updates
├── src/                      # Source code for the site
│   ├── components/           # React components
│   ├── pages/                # Additional pages
│   ├── css/                  # Custom styles
│   └── utils/                # Utility functions
├── static/                   # Static assets
└── docusaurus.config.js      # Docusaurus configuration
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/gridplatform/grid-docs.git
cd grid-docs

# Install dependencies
npm install

# Start the development server
npm start
```

### Building for Production

```bash
# Build the site
npm run build

# Serve the built site
npm run serve
```

## 📚 Documentation Sections

### Getting Started

- **Quick Start**: Deploy your first infrastructure in 5 minutes
- **Installation**: Install Grid Platform components
- **Configuration**: Configure your environment
- **First Deployment**: Deploy a simple web application

### User Guide

- **Core Concepts**: Understanding Grid Platform architecture
- **Infrastructure Management**: Deploy and manage infrastructure
- **Environment Management**: Create and manage environments
- **Monitoring**: Monitor your infrastructure and applications
- **Scaling**: Scale your infrastructure automatically
- **Backup & Recovery**: Backup and disaster recovery

### API Reference

- **REST API**: Complete REST API documentation
- **WebSocket API**: Real-time updates and events
- **CLI Reference**: Command-line interface documentation
- **SDK Documentation**: Software development kits
- **Webhooks**: Webhook configuration and events

### Tutorials

- **Web Application**: Deploy a full-stack web application
- **Microservices**: Deploy microservices architecture
- **Database Setup**: Set up managed databases
- **CI/CD Pipeline**: Set up continuous deployment
- **Multi-Cloud**: Deploy across multiple cloud providers
- **Kubernetes**: Deploy to Kubernetes clusters

### Best Practices

- **Security**: Security best practices and guidelines
- **Cost Optimization**: Optimize your cloud costs
- **Performance**: Performance optimization techniques
- **Monitoring**: Monitoring and observability best practices
- **Disaster Recovery**: Disaster recovery planning
- **Compliance**: Compliance and governance

## 🛠️ Development

### Project Structure

```
grid-docs/
├── docs/                      # Documentation content
│   ├── getting-started/
│   │   ├── quick-start.md
│   │   ├── installation.md
│   │   └── configuration.md
│   ├── user-guide/
│   │   ├── core-concepts.md
│   │   ├── infrastructure.md
│   │   └── environments.md
│   ├── api-reference/
│   │   ├── rest-api.md
│   │   ├── websocket-api.md
│   │   └── cli-reference.md
│   └── tutorials/
│       ├── web-application.md
│       ├── microservices.md
│       └── multi-cloud.md
├── blog/                      # Blog posts
│   ├── 2023-10-04-welcome.md
│   └── 2023-10-05-new-features.md
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── CodeBlock.jsx
│   │   ├── ApiEndpoint.jsx
│   │   └── InteractiveDemo.jsx
│   ├── pages/                 # Additional pages
│   │   ├── index.js
│   │   └── community.js
│   └── css/                   # Custom styles
│       └── custom.css
└── static/                    # Static assets
    ├── img/
    └── downloads/
```

### Available Scripts

```bash
# Development
npm start              # Start development server
npm run build          # Build for production
npm run serve          # Serve built site locally

# Content
npm run write-translations    # Write translation files
npm run write-heading-ids     # Write heading IDs to files

# Deployment
npm run deploy         # Deploy to GitHub Pages
```

### Writing Documentation

#### Markdown Guidelines

```markdown
# Page Title

Brief description of the page.

## Section Title

Content goes here.

### Subsection

More detailed content.

```javascript
// Code examples should be properly formatted
const example = "Hello, Grid!";
```

#### Front Matter

```markdown
---
id: page-id
title: Page Title
sidebar_label: Sidebar Label
description: Page description
keywords: [keyword1, keyword2, keyword3]
---

# Page Title
```

#### Code Examples

```markdown
```bash
# Shell commands
npm install
npm start
```

```javascript
// JavaScript code
const grid = new GridClient({
  apiUrl: 'https://api.gridplatform.org'
});
```

```yaml
# YAML configuration
apiVersion: v1
kind: ConfigMap
metadata:
  name: grid-config
```

#### Interactive Components

```jsx
// Interactive demo component
import React from 'react';
import CodeBlock from '@theme/CodeBlock';

export function InteractiveDemo() {
  return (
    <div className="interactive-demo">
      <CodeBlock language="bash">
        {`# Try this command
grid deploy --template web-app`}
      </CodeBlock>
    </div>
  );
}
```

## 🎨 Customization

### Theme Configuration

```javascript
// docusaurus.config.js
module.exports = {
  title: 'Grid Platform',
  tagline: 'Infrastructure made simple',
  url: 'https://docs.gridplatform.org',
  baseUrl: '/',
  
  themeConfig: {
    navbar: {
      title: 'Grid Platform',
      logo: {
        alt: 'Grid Platform Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/getting-started/quick-start',
          label: 'Getting Started',
          position: 'left',
        },
        {
          to: 'docs/user-guide/core-concepts',
          label: 'User Guide',
          position: 'left',
        },
        {
          to: 'docs/api-reference/rest-api',
          label: 'API Reference',
          position: 'left',
        },
        {
          to: 'blog',
          label: 'Blog',
          position: 'left',
        },
        {
          href: 'https://github.com/gridplatform',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/getting-started/quick-start',
            },
            {
              label: 'User Guide',
              to: 'docs/user-guide/core-concepts',
            },
            {
              label: 'API Reference',
              to: 'docs/api-reference/rest-api',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/gridplatform',
            },
            {
              label: 'Discussions',
              href: 'https://github.com/gridplatform/grid-core/discussions',
            },
            {
              label: 'Issues',
              href: 'https://github.com/gridplatform/grid-core/issues',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'Changelog',
              to: 'docs/changelog',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Grid Platform. Built with Docusaurus.`,
    },
  },
};
```

### Custom Components

```jsx
// src/components/ApiEndpoint.jsx
import React from 'react';
import CodeBlock from '@theme/CodeBlock';

export function ApiEndpoint({ method, path, description, example }) {
  return (
    <div className="api-endpoint">
      <div className="api-method">
        <span className={`method-${method.toLowerCase()}`}>
          {method}
        </span>
        <code className="api-path">{path}</code>
      </div>
      <p className="api-description">{description}</p>
      {example && (
        <CodeBlock language="json">
          {JSON.stringify(example, null, 2)}
        </CodeBlock>
      )}
    </div>
  );
}
```

## 📊 Analytics and Monitoring

### Google Analytics

```javascript
// docusaurus.config.js
module.exports = {
  themeConfig: {
    gtag: {
      trackingID: 'G-XXXXXXXXXX',
      anonymizeIP: true,
    },
  },
};
```

### Search Integration

```javascript
// docusaurus.config.js
module.exports = {
  themeConfig: {
    algolia: {
      apiKey: 'your-api-key',
      indexName: 'grid-platform',
      appId: 'your-app-id',
    },
  },
};
```

## 🚀 Deployment

### GitHub Pages

```bash
# Deploy to GitHub Pages
npm run deploy
```

### Netlify

```yaml
# netlify.toml
[build]
  command = "npm run build"
  publish = "build"

[build.environment]
  NODE_VERSION = "18"
```

### Vercel

```json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ]
}
```

## 🤝 Contributing

### Documentation Guidelines

1. **Write for your audience**: Consider who will read the documentation
2. **Be clear and concise**: Use simple language and short sentences
3. **Include examples**: Show, don't just tell
4. **Keep it up to date**: Update documentation when features change
5. **Test your examples**: Make sure code examples work

### Contributing Process

1. Fork the repository
2. Create a feature branch: `git checkout -b docs/amazing-feature`
3. Make your changes
4. Test locally: `npm start`
5. Commit your changes: `git commit -m 'Add amazing documentation'`
6. Push to the branch: `git push origin docs/amazing-feature`
7. Open a Pull Request

### Content Guidelines

- Use clear, descriptive headings
- Include a table of contents for long pages
- Add code examples for all features
- Include screenshots for UI features
- Link to related documentation
- Keep the tone professional but friendly

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/gridplatform/grid-docs/issues)
- **Discussions**: [GitHub Discussions](https://github.com/gridplatform/grid-docs/discussions)
- **Email**: docs@gridplatform.org

## 🔗 Related Projects

- [Grid Core](https://github.com/gridplatform/grid-core) - Backend API
- [Grid UI](https://github.com/gridplatform/grid-ui) - Frontend interface
- [Grid Terraform](https://github.com/gridplatform/grid-terraform) - Infrastructure modules
- [Grid Operator](https://github.com/gridplatform/grid-operator) - Kubernetes operator

---

**Built with ❤️ by the Grid Platform team**