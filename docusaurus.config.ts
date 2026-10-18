import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

/**
 * Public docs: https://gridplatform.org/doc/
 * GitHub Pages still publishes this build at https://gridplatform.github.io/doc/
 */
const config: Config = {
  title: 'About Grid',
  tagline: 'Self-hosted orchestration — cloud, GitOps, and workloads',
  favicon: 'img/favicon-32x32.png',

  url: 'https://gridplatform.org',
  baseUrl: '/doc/',

  organizationName: 'gridplatform',
  projectName: 'grid-docs',
  deploymentBranch: 'gh-pages',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          exclude: ['**/README.md'],
          editUrl: 'https://github.com/gridplatform/grid-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/og.jpg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    navbar: {
      title: 'Docs',
      logo: {
        alt: 'Docs home',
        src: 'img/logo.png',
        srcDark: 'img/logo.png',
        width: 28,
        height: 28,
      },
      items: [
        {
          to: '/Getting-Started/Quick_Start',
          label: 'Quick start',
          position: 'left',
        },
        {
          href: 'https://gridplatform.org/',
          label: 'Website',
          position: 'right',
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
          title: 'Start',
          items: [
            { label: 'About Grid', to: '/' },
            { label: 'Quick start', to: '/Getting-Started/Quick_Start' },
            { label: 'Install', to: '/Install/Overview' },
          ],
        },
        {
          title: 'Deep dives',
          items: [
            { label: 'Exit ramp', to: '/Concepts/Exit_Ramp' },
            { label: 'Kubernetes workloads', to: '/Concepts/Kubernetes_Workloads' },
            { label: 'AWS catalog', to: '/Clouds/AWS' },
            { label: 'Roadmap', to: '/Roadmap' },
          ],
        },
        {
          title: 'Repos',
          items: [
            { label: 'grid-core', href: 'https://github.com/gridplatform/grid-core' },
            { label: 'grid-ui', href: 'https://github.com/gridplatform/grid-ui' },
            { label: 'grid-cli', href: 'https://github.com/gridplatform/grid-cli' },
            { label: 'grid-config', href: 'https://github.com/gridplatform/grid-config' },
            { label: 'grid-terraform', href: 'https://github.com/gridplatform/grid-terraform' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Grid Platform · MIT`,
    },
    prism: {
      additionalLanguages: ['bash', 'json', 'hcl', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
