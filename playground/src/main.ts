import { createApp } from 'vue';
import App from './App.vue';
import { createVuetify } from 'vuetify';
import VBirthdayPickerPlugin from '../../src';
import 'vuetify/styles';

createApp(App).use(createVuetify()).use(VBirthdayPickerPlugin).mount('#app');
