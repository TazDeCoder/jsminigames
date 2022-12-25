import { useReducer } from 'react';

const initialState = {
  score: 0,
  isGameStart: false,
  isRoundStart: false,
};

type ActionType =
  | { type: 'SCORE_UPDATE'; payload: number }
  | { type: 'GAME_UPDATE'; payload: boolean }
  | { type: 'ROUND_UPDATE'; payload: boolean };

function reducer(state: typeof initialState, action: ActionType) {
  if (action.type === 'SCORE_UPDATE') {
    return { ...state, score: action.payload };
  }

  if (action.type === 'GAME_UPDATE') {
    return { ...state, isGameStart: action.payload };
  }

  if (action.type === 'ROUND_UPDATE') {
    return { ...state, isRoundStart: action.payload };
  }

  return state;
}

export default function useGame() {
  const [game, dispatch] = useReducer(reducer, initialState);

  const dispatchScoreUpdate = (newState: number) => {
    dispatch({ type: 'SCORE_UPDATE', payload: newState });
  };

  const dispatchGameUpdate = (newState: boolean) => {
    dispatch({ type: 'GAME_UPDATE', payload: newState });
  };

  const dispatchRoundUpdate = (newState: boolean) => {
    dispatch({ type: 'ROUND_UPDATE', payload: newState });
  };

  return {
    game,
    updateScore: dispatchScoreUpdate,
    updateGame: dispatchGameUpdate,
    updateRound: dispatchRoundUpdate,
  };
}
