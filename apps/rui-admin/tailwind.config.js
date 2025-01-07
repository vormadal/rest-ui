const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
// FIX this is probably not the best way to do this
// but it works for now
// eslint-disable-next-line @nx/enforce-module-boundaries
import config from '../../libs/ui/tailwind.config';

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...config,
  content: [
    '../../ui/**/*.{js,jsx,ts,tsx}',
    '../../ui/tailwind.config.js',
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  plugins: [],
};
