import { AnyAction } from "redux-saga";
import { ROUTING_ACTION_TYPES } from "./routing.types";

export type RoutingState = {
    readonly redirectTo: string;
}

export const INITIAL_STATE: RoutingState = {
    redirectTo: '',
}

export const routingReducer = (state = INITIAL_STATE, action: AnyAction) => {
    switch(action.type) {
        case ROUTING_ACTION_TYPES.REDIRECT_TO_START: {
            return { ...state, redirectTo: action.payload };
        }
        case ROUTING_ACTION_TYPES.REDIRECT_TO_FINISH: {
            return { ...state, redirectTo: '' };
        }
        default: {
            return state;
        }
    }
}
