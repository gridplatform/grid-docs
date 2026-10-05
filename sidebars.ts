import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

/**
 * Optional — used only if you run Docusaurus later.
 * Primary reading surface is GitHub (README + docs/**/*.md).
 */
const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    'organizations',
    {
      type: 'category',
      label: 'Install',
      collapsed: false,
      items: [
        'install/overview',
        'install/remote-state',
        'install/vm',
        'install/docker-compose',
        'install/configuration',
      ],
    },
    {
      type: 'category',
      label: 'Concepts',
      items: ['concepts/overview'],
    },
    {
      type: 'category',
      label: 'Admin',
      items: ['admin/rbac'],
    },
    {
      type: 'category',
      label: 'CLI',
      items: ['cli/aws-gcp'],
    },
  ],
};

export default sidebars;
