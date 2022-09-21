import { UIState } from '.';

type UIActionType = { type: 'UI - ToggleMenu' };

export const uiReducer = (state: UIState, actions: UIActionType): UIState => {
  switch (actions.type) {
    case 'UI - ToggleMenu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen,
      };

    default:
      return state;
  }
};
