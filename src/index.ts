import moduleAlias from 'module-alias';
if (process.env.NODE_ENV === 'production') {
  moduleAlias.addAliases({
    '@models': `${process.cwd()}/dist/models`,
    '@controllers': `${process.cwd()}/dist/src/controllers`,
    '@services': `${process.cwd()}/dist/src/services`,
    '@mockdata': `${process.cwd()}/dist/src/mockdata`,
  });
}
import { App } from './app';
// tslint:disable-next-line: no-var-requires
require('dotenv').config();

// const server: App = new App(Environment.PORT);
const server: App = new App(process.env.PORT || 3000);
server.run();
