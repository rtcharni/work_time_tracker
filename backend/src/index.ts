// import { Environment } from '@environment';
import { App } from "./app";

// const server: App = new App(Environment.PORT);
const server: App = new App(3005);
server.run();
