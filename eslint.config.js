// eslint.config.js
import { defineConfig } from 'eslint/config';
import config from './index';

export default defineConfig([
  {
    files: ['**/*.js'],
    extends: [config]
  }
]);
