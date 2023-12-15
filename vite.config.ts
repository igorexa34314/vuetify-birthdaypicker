import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: { transformAssetUrls },
		}),
		vuetify({
			autoImport: true,
		}),
	],
	resolve: {
		alias: {
			'@': resolve(dirname(fileURLToPath(import.meta.url)), './src'),
		},
	},
	optimizeDeps: {
		include: ['vuetify'],
	},
	build: {
		rollupOptions: {
			// Make sure to exclude Vue from the bundle
			external: ['vue'],
		},
	},
});
