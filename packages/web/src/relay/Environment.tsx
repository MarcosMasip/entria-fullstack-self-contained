import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import { relayTransactionLogger } from '@entria/relay';

import cacheHandler from './cacheHandler';

const __DEV__ = process.env.NODE_ENV === 'development';

const network = Network.create((req, vars, cacheConfig, uploadables) =>
  cacheHandler(req, vars, cacheConfig as any, (uploadables as any) || undefined as any)
);

const source = new RecordSource();
const store = new Store(source);

// export const inspector = new RecordSourceInspector(source);

const env = new Environment({
  network,
  store,
  log: __DEV__ ? relayTransactionLogger : null,
});

export default env;
