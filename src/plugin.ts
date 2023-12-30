import { VBirthdayPicker } from '@/components';
import type { Plugin } from 'vue';

const VBirthdayPickerPlugin: Plugin = {
	install: app => {
		app.component('VBirthdayPicker', VBirthdayPicker);
	},
};

export { VBirthdayPickerPlugin };
