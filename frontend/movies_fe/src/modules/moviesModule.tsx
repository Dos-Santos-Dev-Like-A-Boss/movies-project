import React, {useEffect} from "react";
import {Route, Switch, useHistory} from "react-router-dom";
import {Movies} from "../components/Movies";
import {Likes} from "../components/Likes";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {AppBar, colors, createStyles, IconButton, makeStyles, Theme, Toolbar} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import {UserActionTypes} from "../store/user/userActions";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        link: {
            width: 200,
            color: colors.common.white,
        },
        logout: {
            width: 100,
        }
    }),
);

export const MoviesModule: React.FC = () => {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    const history = useHistory();
    useEffect(() => {
        if (!isLoggedIn) {
            history.push("/auth/sign-in");
        }
    }, [history, isLoggedIn]);
    const classes = useStyles();
    const dispatch = useDispatch();

    const goToSearch = () => {
        history.push("/");
    }

    const goToLikes = () => {
        history.push("/likes");
    }

    const logout = () => {
        localStorage.removeItem('userId');
        dispatch({type: UserActionTypes.LOGOUT});
    }

    if(!isLoggedIn) {
        return null;
    }

    return <>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Button onClick={goToSearch} className={classes.link}>
                    Search Movies
                </Button>
                <Button onClick={goToLikes} className={classes.link}>
                    My Preferences
                </Button>
                <div style={{display: "flex", flexGrow: 1, justifyContent: "flex-end"}}>
                    <Button className={classes.logout} onClick={logout} color="inherit">Logout</Button>
                </div>
            </Toolbar>
        </AppBar>
        <Switch>
            <Route exact path="/">
                <Movies/>
            </Route>
            <Route path="/likes">
                <Likes/>
            </Route>
        </Switch>
    </>
}
