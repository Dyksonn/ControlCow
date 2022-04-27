import React, { ReactNode } from 'react';

import { CheckListProvider } from './checklist';

interface AppProviderProps {
  children: ReactNode;
}

function AppProvider({ children }: AppProviderProps) {
  return (
    <CheckListProvider>
      {children}
    </CheckListProvider>
  )
}

export { AppProvider };
