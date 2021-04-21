import {Dispatch} from "react";
import {Apis} from "../../apis";
import {IAction} from "../action.interface";
import {IMovie} from "../../models/movie";

export enum UserActionTypes {
    LOGIN_FAILED = "auth/LOGIN_FAILED",
    LOGIN_SUCCEEDED = "auth/LOGIN_SUCCEEDED",
    LOGOUT = "auth/LOGOUT",
    UPDATE_USER_PREFERENCES = "user/updateUserPreferences"
}

export type RegisterUserDto = {
    email: string;
    name: string;
    password: string;
}

export const CheckWhoami = async (dispatch: Dispatch<IAction>) => {
    const token = localStorage.getItem('userId');
    if(!token) {
        dispatch({type: UserActionTypes.LOGIN_FAILED})
    } else {
        try {
            const response = await Apis.whoAmI(token);
            dispatch({type: UserActionTypes.LOGIN_SUCCEEDED, payload: response.data});
        } catch (err) {
            console.log(err);
            dispatch({type: UserActionTypes.LOGIN_FAILED});
        }
    }
}

export const Login = (email: string, password: string) => async (dispatch: Dispatch<IAction>) => {
    const response = await Apis.signIn(email, password);
    localStorage.setItem('userId', response.data.id);
    dispatch({
        type: UserActionTypes.LOGIN_SUCCEEDED,
        payload: response.data,
    })
}

export const Register = (user: RegisterUserDto) => async (dispatch: Dispatch<IAction>) => {
    const response = await Apis.signUp(user);
    localStorage.setItem('userId', response.data.id);
    dispatch({
        type: UserActionTypes.LOGIN_SUCCEEDED,
        payload: response.data,
    })
}

export const LikeMovie = (movie: IMovie, userId: string) => async (dispatch: Dispatch<IAction>) => {
    const response = await Apis.likeMovie(movie, userId);
    dispatch({
        type: UserActionTypes.UPDATE_USER_PREFERENCES,
        payload: response.data,
    })
}

export const DisLikeMovie = (movieId: number, userId: string) => async (dispatch: Dispatch<IAction>) => {
    const response = await Apis.dislikeMovie(movieId, userId);
    dispatch({
        type: UserActionTypes.UPDATE_USER_PREFERENCES,
        payload: response.data,
    })
}
