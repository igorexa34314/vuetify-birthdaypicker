import { VBirthdayPicker } from '@/components';
import type { Plugin } from 'vue';
import { createVuetify, type VuetifyOptions } from 'vuetify';

const VBirthdayPickerPlugin: Plugin = {
	install: (app, options?: VuetifyOptions) => {
		// Install vuetify if not exist
		if (!app.config.globalProperties.$vuetify) {
			app.use(createVuetify(options));
		}

		app.component('VBirthdayPicker', VBirthdayPicker);
	},
};

export { VBirthdayPickerPlugin };
