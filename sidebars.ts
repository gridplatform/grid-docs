import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docs: [
    'intro',
    {
      type: 'category',
      label: 'Install',
      collapsed: false,
      items: [
        'install/overview',
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
