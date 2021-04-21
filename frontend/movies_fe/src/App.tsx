import React, {useEffect} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {AuthModule} from "./modules/authModule";
import {MoviesModule} from "./modules/moviesModule";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store/store";
import {CheckWhoami} from "./store/user/userActions";

function App() {
    const dispatch = useDispatch();
    const authNotChecked = useSelector((state: RootState) => state.user.isLoggedIn === null);
    useEffect(() => {
        dispatch(CheckWhoami);
    }, [dispatch]);

    if(authNotChecked) {
       return null;
    }
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/auth">
                    <AuthModule/>
                </Route>
                <Route path="/">
                    <MoviesModule/>
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
