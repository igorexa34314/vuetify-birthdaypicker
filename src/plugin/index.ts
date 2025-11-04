import { VBirthdayPicker } from '../components';
import type { Plugin } from 'vue';

export const VBirthdayPickerPlugin: Plugin = {
	install: app => {
		app.component('VBirthdayPicker', VBirthdayPicker);
	},
};
