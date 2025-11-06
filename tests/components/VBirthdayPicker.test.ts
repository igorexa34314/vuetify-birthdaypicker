import { mount } from '@vue/test-utils';
import { expect, describe, it } from 'vitest';
import { VBirthdayPicker } from '../../src';
import { createVuetify } from 'vuetify';
import { VSelect } from 'vuetify/components';

const vuetify = createVuetify();

global.ResizeObserver = require('resize-observer-polyfill');

describe('VBirthdayPicker component', () => {
	it('should render', () => {
		const picker = mount(VBirthdayPicker, {
			props: {
				modelValue: new Date(1762453508676),
			},
			global: {
				components: {
					VSelect,
				},
				plugins: [vuetify],
			},
		});

		expect(
			['6', 'Day', 'November', 'Month', '2025', 'Year'].every(word =>
				picker.text().includes(word)
			)
		).toEqual(true);
	});
});
