import { createContext } from 'react';
const Store = createContext();
Store.displayName = 'Store';
const { Provider, Consumer } = Store;
export { Provider, Consumer };
