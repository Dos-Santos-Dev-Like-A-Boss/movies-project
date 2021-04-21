import { combineReducers, applyMiddleware, createStore } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {MoviesReducer} from "./movies/moviesReducer";
import {UserReducer} from "./user/userReducer";

const middleware = [
    thunk,
];

const reducers = combineReducers({user: UserReducer, movies: MoviesReducer});
export type RootState = ReturnType<typeof reducers>;
export const store = createStore(reducers, composeWithDevTools(applyMiddleware(...middleware)));
