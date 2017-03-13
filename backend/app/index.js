import chalk from 'chalk';

import { NAME, HTTP_PORT, HTTP_HOST } from '../../config';
import appMaker from './app';

const app = appMaker();


function write(message, color) {
  return `[${color(NAME)}]: ${message}`;
}

function shutdown(server, code = 0) {
  const color = code === 0 ? chalk.green : chalk.red;
  console.log(write(`Shutting down (code: ${code})...`, color));
  server.close();
  process.exit(code);
}

const server = app.listen(HTTP_PORT, HTTP_HOST, () => {
  console.log(write(`Listening on ${HTTP_HOST}:${HTTP_PORT}...`, chalk.green));
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(write(`${HTTP_HOST}:${HTTP_PORT} in use...`, chalk.red));
    process.exit(0);
  } else {
    console.error(err.stack);
    throw err;
  }
});

process.on('SIGTERM', () => shutdown(server));
process.on('SIGINT', () => shutdown(server));
process.on('uncaughtException', (err) => {
  console.error(err.stack);
  shutdown(server, 1);
});
