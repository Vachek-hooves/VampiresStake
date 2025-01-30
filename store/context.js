import React, {createContext, useState, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const VampireContext = createContext({});

export function VampireProvider({children}) {
  const [test, setTest] = useState('Context welcome you');
  const value = {};

  return (
    <VampireContext.Provider value={value}>{children}</VampireContext.Provider>
  );
}

export function useVampireContext() {
  return useContext(VampireContext);
}
