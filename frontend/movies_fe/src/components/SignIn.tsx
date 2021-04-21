import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {Fingerprint} from "@material-ui/icons";
import React, {useCallback, useState} from "react";
import {useHistory} from "react-router-dom";
import EmailIcon from '@material-ui/icons/Email';
import {useDispatch} from "react-redux";
import {Login} from "../store/user/userActions";

export const SignIn: React.FC = () => {

    const { push } = useHistory();
    const [signInState, setSignInState] = useState({email: "", password: ""});
    const dispatch = useDispatch();

    const changeFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignInState({
            ...signInState,
            [e.target.name]: e.target.value,
        })
    }

    const login = async () => {
        try {
            await dispatch(Login(signInState.email, signInState.password));
        } catch (err) {
            alert("oops, login failed, try again");
        }
    }
    const goToSignUp = useCallback(() => {
        push("/auth/sign-up")
    }, [push]);

    return <Paper style={{width: 420, padding: 35}}>
        <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
                <EmailIcon/>
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
                <TextField onChange={changeFormData} name="email" label="Email" type="email" fullWidth autoFocus required/>
            </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
                <Fingerprint/>
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
                <TextField onChange={changeFormData} name="password" label="Password" type="password" fullWidth required/>
            </Grid>
        </Grid>
        <Grid container justify="center" style={{marginTop: '30px'}}>
            <Button onClick={login} variant="outlined" color="primary" style={{textTransform: "none"}}>Login</Button>
        </Grid>
        <Grid container justify="center" style={{marginTop: '10px'}}>
            <Button onClick={goToSignUp} disableFocusRipple disableRipple style={{textTransform: "none"}} variant="text" color="primary">Sign
                Up</Button>
        </Grid>
    </Paper>
}
