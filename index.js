import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// Memastikan aplikasi berjalan baik di Expo Go maupun native build
registerRootComponent(App);
