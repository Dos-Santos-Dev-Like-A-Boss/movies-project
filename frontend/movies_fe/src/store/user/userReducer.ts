import {UserActionTypes} from "./userActions";
import {IAction} from "../action.interface";
import {IMovie} from "../../models/movie";

interface IUser {
    id: string;

    email: string;

    password: string;

    name: string;

    likes: IMovie[];
}

interface IAuthReducerState {
    isLoggedIn: boolean | null;
    user?: IUser;
}

const initialState: IAuthReducerState = {
    isLoggedIn: null,
};

export function UserReducer(state = initialState, action: IAction) {
    switch (action.type) {
        case UserActionTypes.LOGIN_SUCCEEDED:
            return  {
                ...state,
                user: action.payload,
                isLoggedIn: true,
            }
        case UserActionTypes.LOGIN_FAILED:
            return  {
                ...state,
                user: undefined,
                isLoggedIn: false,
            }
        case UserActionTypes.LOGOUT:
            return {
                ...state,
                isLoggedIn: false
            }
        case UserActionTypes.UPDATE_USER_PREFERENCES:
            return {
                ...state,
                user: action.payload,
            }
        default:
            return state;
    }
}
