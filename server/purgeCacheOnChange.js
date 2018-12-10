/* eslint-disable no-console */

import chokidar from 'chokidar';

export const purgeCacheOnChange = path => {
  const watcher = chokidar.watch(path);

  watcher.on('ready', () => {
    watcher.on('all', () => {
      console.log('Reloading server...');

      Object.keys(require.cache).forEach(id => {
        if (/[/\\](src|server)[/\\]/.test(id)) {
          delete require.cache[id];
        }
      });
    });
  });
};
