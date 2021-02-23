import React, { useContext } from 'react';
import { createAppStore } from '../store/app-store';

const appStore = createAppStore();

export const storesContext = React.createContext(appStore);

export const useStores = () => useContext(storesContext);
