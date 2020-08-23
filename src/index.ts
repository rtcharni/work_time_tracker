// tslint:disable-next-line: no-var-requires
// require('module-alias/register');
import moduleAlias from 'module-alias';

if (process.env.NODE_ENV === 'production') {
  moduleAlias.addAliases({
    '@models': 'dist/models',
    '@controllers': 'dist/src/controllers',
    '@services': 'dist/src/services',
    '@mockdata': 'dist/src/mockdata',
  });
}

import { App } from './app';
// tslint:disable-next-line: no-var-requires
require('dotenv').config();

// const server: App = new App(Environment.PORT);
const server: App = new App(process.env.PORT || 3000);
server.run();
