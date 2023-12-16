import { createApp } from 'vue';
import App from './App.vue';
import VBirthdayPickerPlugin from './index';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';

createApp(App).use(createVuetify()).use(VBirthdayPickerPlugin).mount('#app');
