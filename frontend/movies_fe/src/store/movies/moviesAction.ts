import {Dispatch} from "react";
import {IAction} from "../action.interface";
import {Apis} from "../../apis";

export enum MoviesActions {
    FETCH_MOVIES = "movies/FETCH_MOVIES",
    RESET_MOVIES = "movies/RESET_MOVIES"
}

export const FetchFilms = (q: string) => async (dispatch: Dispatch<IAction>) => {
    const response = await Apis.fetchFilms(q);
    dispatch({
        type: MoviesActions.FETCH_MOVIES,
        payload: response.data,
    })
}

