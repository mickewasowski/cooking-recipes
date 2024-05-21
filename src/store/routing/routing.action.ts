import { ROUTING_ACTION_TYPES } from './routing.types';

export const redirectToStart = (path: string) => ({ type: ROUTING_ACTION_TYPES.REDIRECT_TO_START, payload: path });
export const redirectToFinish = () => ({ type: ROUTING_ACTION_TYPES.REDIRECT_TO_FINISH });
