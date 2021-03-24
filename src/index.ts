import path from 'path';
import moduleAlias from 'module-alias';
if (process.env.NODE_ENV === 'production') {
  moduleAlias.addAliases({
    '@models': path.resolve(__dirname, '..', 'models'),
    '@controllers': path.resolve(__dirname, 'controllers'),
    '@services': path.resolve(__dirname, 'services'),
    '@mockdata': path.resolve(__dirname, 'mockdata'),
  });
}
import { App } from './app';
// tslint:disable-next-line: no-var-requires
require('dotenv').config();

// const server: App = new App(Environment.PORT);
const server: App = new App(process.env.PORT || 3000);
server.run();
