import { createApp } from 'vue'//The object we are passing into createApp is in fact a component.
import App from './App.vue'//"root component" that can contain other components as its children.
import './assets/reset.css';

createApp(App).mount('#app')//An application instance won't render anything until its .mount() method is called.
//The .mount() method should always be called after all app configurations and asset registrations are done. 
//Also note that its return value, unlike the asset registration methods, is the root component instance instead of the application instance.

/**this is the entry point to your application. Currently, this file initializes your Vue application and 
 * signifies which HTML element in the index.html file your app should be attached to. 
 * This file is often where you register global components or additional Vue libraries. */