// tslint:disable-next-line: no-var-requires
require('module-alias/register');
import { App } from './app';
// tslint:disable-next-line: no-var-requires
require('dotenv').config();

// const server: App = new App(Environment.PORT);
const server: App = new App(process.env.PORT || 3000);
server.run();
