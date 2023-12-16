import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'path';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
	return defineConfig({
		base: mode === 'docs' ? process.env.VITE_BASE || '/' : undefined,
		plugins: [
			vue({
				template: { transformAssetUrls },
			}),
			vuetify({
				autoImport: mode === 'docs',
			}),
			{
				apply: () => mode !== 'docs',
				...dts({
					tsconfigPath: './tsconfig.json',
					exclude: [fileURLToPath(new URL('./src/main.ts', import.meta.url))],
				}),
			},
		],
		resolve: {
			alias: {
				'@': resolve(dirname(fileURLToPath(import.meta.url)), './src'),
			},
		},
		optimizeDeps: {
			exclude: ['vue', 'vuetify'],
		},
		build: {
			outDir: mode === 'docs' ? 'docs' : undefined,
			rollupOptions: {
				external: mode === 'docs' ? undefined : ['vue', 'vuetify/components'],
				output: {
					esModule: true,
					exports: 'named',
					globals: {
						vue: 'Vue',
						vuetify: 'Vuetify',
						'vuetify/components': 'VuetifyComponents',
					},
				},
			},
			lib:
				mode === 'docs'
					? undefined
					: {
							entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
							name: 'VBirthdayPicker',
							fileName: format => `index.${format === 'umd' ? `${format}.cjs` : 'js'}`,
						},
			emptyOutDir: mode !== 'docs',
		},
	});
};
