import { loadRemoteModule } from '@angular-architects/module-federation';

export const registry = {
    mfe1: () => loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './web-components'
    }),
    mfe2: () => loadRemoteModule({
        type: 'script',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        remoteName: 'mfe2',
        exposedModule: './web-components'
    }),
    // monolithic: () => loadRemoteModule({
    //     type: 'script',
    //     remoteEntry: 'http://localhost:4203/remoteEntry.js',
    //     remoteName: 'monolithic',
    //     exposedModule: './web-components'
    // })
    // monolithic: () => loadRemoteModule({
    //     type: 'script',
    //     remoteEntry: 'http://127.0.0.1:8080/framework-poll.js',
    //     remoteName: 'monolithic',
    //     exposedModule: './web-components'
    // }),
};
