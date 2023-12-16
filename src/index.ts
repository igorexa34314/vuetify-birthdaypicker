export { VBirthdayPickerPlugin as default } from '@/plugin';
export { VBirthdayPicker, type VBirthdayPickerProps } from '@/components';

// For CDN.
// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) {
	// @ts-ignore
	window.Vue.use(VBirthdayPickerPlugin);
}
