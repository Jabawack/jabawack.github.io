import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  "stories": [
    "../src/components/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/components/**/*.mdx"
  ],
  "addons": [
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-vitest",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook"
  ],
  "framework": "@storybook/nextjs-vite",
  "staticDirs": [
    "../public"
  ]
};
export default config;