import { FC, PropsWithChildren, useReducer } from 'react';
import { UiContext, uiReducer } from './';

export interface UIState {
  isMenuOpen: boolean;
}

const UIInitialState: UIState = {
  isMenuOpen: false,
};

export const UIProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UIInitialState);

  const toogleSideMenu = () => {
    dispatch({ type: 'UI - ToggleMenu' });
  };

  return (
    <UiContext.Provider
      value={{
        ...state,
        toogleSideMenu,
      }}
    >
      {children}
    </UiContext.Provider>
  );
};
