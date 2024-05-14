import React, { createContext, useCallback, useContext, useState } from 'react';

//Interface define o formato do objeto que será passado para o createContext
interface IDrawerContextData {
  //Definindo a tipagem do objeto
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  children: React.ReactNode;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

interface IDrawerOption {
  icon: string;
  label: string;
  path: string;
}

const DrawerContext = createContext({} as IDrawerContextData);

//Criando um hook customizado
export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC <IDrawerContextData> = ({ children }) => {

  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  //Irá fazer a troca dos temas
  const toggleDrawerOpen = useCallback(() => {
    //Está alterando o valor
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  //Irá receber novas opções de menu
  const handleSetDrawerOption = useCallback((newDrawerOptions: IDrawerOption[]) => {
    //Está alterando o valor
    setDrawerOptions(newDrawerOptions);
  }, []);
  
  return(
    <DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, children, setDrawerOptions: handleSetDrawerOption }}>
      {children}
    </DrawerContext.Provider>
  );
};
