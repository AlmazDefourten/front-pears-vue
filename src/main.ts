/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import Vue3TouchEvents from "vue3-touch-events";

const app = createApp(App)

app.use(Vue3TouchEvents);

registerPlugins(app)

app.mount('#app')
