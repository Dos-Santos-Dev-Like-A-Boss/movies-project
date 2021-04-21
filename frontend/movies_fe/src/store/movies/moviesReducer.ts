import {IAction} from "../action.interface";
import {MoviesActions} from "./moviesAction";
import {IMovie} from "../../models/movie";

interface IMoviesReducerState {
    movies: IMovie[];
}

const initialState: IMoviesReducerState = {
    movies: [],
};

export function MoviesReducer(state: IMoviesReducerState = initialState, action: IAction) {
    switch (action.type) {
        case MoviesActions.FETCH_MOVIES:
            return {
                ...state,
                movies: action.payload,
            }
        case MoviesActions.RESET_MOVIES:
            return {
                ...state,
                movies: [],
            }
        default:
            return state;
    }
}
