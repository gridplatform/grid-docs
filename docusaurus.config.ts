import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'Grid Platform Docs',
  tagline: 'Infrastructure orchestration — install, operate, extend',
  url: 'https://docs.gridplatform.org',
  baseUrl: '/',

  organizationName: 'gridplatform',
  projectName: 'grid-docs',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
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
    navbar: {
      title: 'Grid Docs',
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docs',
          position: 'left',
          label: 'Documentation',
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
            { label: 'Install overview', to: '/install/overview' },
            { label: 'Install on a VM', to: '/install/vm' },
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
      copyright: `Copyright © ${new Date().getFullYear()} Grid Platform. MIT.`,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
