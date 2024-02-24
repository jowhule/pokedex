import React, { ReactNode, createContext, useState } from "react";

type LoadContextType = {
  loadPage: boolean;
  setLoadPage: React.Dispatch<React.SetStateAction<boolean>>;
};

type LoadProviderType = {
  children?: ReactNode;
};

const LoadContext = createContext<LoadContextType | undefined>(undefined);

export const useLoadPageContext = () => {
  const loadContext = React.useContext(LoadContext);
  if (loadContext === undefined) {
    throw new Error("useLoadPageContext must be inside a LoadProvider");
  }
  return loadContext;
};

export const LoadProvider: React.FC<LoadProviderType> = ({ children }) => {
  const [loadPage, setLoadPage] = useState<boolean>(true);
  return (
    <LoadContext.Provider value={{ loadPage, setLoadPage }}>
      {children}
    </LoadContext.Provider>
  );
};
