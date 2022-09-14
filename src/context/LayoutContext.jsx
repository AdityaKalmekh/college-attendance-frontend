import { createContext, useState, useContext, useCallback, useMemo } from 'react';

const LayoutContext = createContext({
  isDrawerOpened: true,
  toggleDrawer: () => {},
});

export const LayoutContextProvider = ({ children }) => {
  const [isDrawerOpened, setIsDrawerOpened] = useState(true);

  const toggleDrawer = useCallback(() => {
    setIsDrawerOpened((c) => !c);
  }, []);

  const value = useMemo(
    () => ({
      isDrawerOpened,
      toggleDrawer,
    }),
    [isDrawerOpened, toggleDrawer]
  );
  return <LayoutContext.Provider value={value}>{children}</LayoutContext.Provider>;
};

export const useLayoutContext = () => {
  const context = useContext(LayoutContext);
  if (context === undefined) {
    throw new Error('useLayoutContext must be used within a LayoutContextProvider');
  }
  return context;
};
