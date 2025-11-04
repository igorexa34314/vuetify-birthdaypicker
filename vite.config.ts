import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
	root: './playground',
	base: process.env.VITE_BASE || '/',
	plugins: [vue()],
});
