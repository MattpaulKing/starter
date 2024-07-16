
import { join } from 'path';
import { skeleton } from '@skeletonlabs/tw-plugin';
import { pinche } from './theme';
import type { Config } from 'tailwindcss';

const config = {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    join(require.resolve(
      '@skeletonlabs/skeleton'),
      '../**/*.{html,js,svelte,ts}'
    )
  ],
  theme: {
    extend: {},
  },
  plugins: [
    skeleton({
      themes: {
        custom: [
          pinche
        ]
      }
    })
  ]

} satisfies Config;

export default config;

