// eslint.config.js
import { defineConfig } from 'eslint/config';
import config from './index';

export default defineConfig([
  {
    files: ['**/*.js'],
    extends: [config]
  },
  {
    files: ['**/*.md'],
    rules: {
      'no-irregular-whitespace': 'off',
      '@stylistic/indent': 'off'
    }
  }
]);
