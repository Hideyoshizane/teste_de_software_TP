import { useCallback, useRef } from 'react';

//A pesquisa ocorrerá apenas quando o usuário parar de digitar por 300ms
export const useDebounce = (delay = 300, notDelyInFirsTime = true) => {
  const isFirstTime = useRef(notDelyInFirsTime);
  const debouncing = useRef<NodeJS.Timeout>();

  const debounce = useCallback((func: () => void) => {
    if(isFirstTime.current){
      isFirstTime.current = false;
      func();
    }else{
      //Cancelando o timout que tinha
      if(debouncing.current){ clearTimeout(debouncing.current);}
      debouncing.current = setTimeout(() => { func();}, delay);
    }
  }, [delay]);

  return { debounce };
};