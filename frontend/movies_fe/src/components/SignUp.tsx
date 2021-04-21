import React, {useCallback, useState} from "react";
import {Button, Grid, Paper, TextField} from "@material-ui/core";
import {Face, Fingerprint} from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import EmailIcon from '@material-ui/icons/Email';
import {useDispatch} from "react-redux";
import {Register, RegisterUserDto} from "../store/user/userActions";

export const SignUp: React.FC = () => {
    const { push } = useHistory();
    const dispatch = useDispatch();
    const [registrationForm, setRegistrationForm] = useState<RegisterUserDto>({
        name: "",
        password: "",
        email: "",
    });

    const changeFormData = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRegistrationForm({
            ...registrationForm,
            [e.target.name]: e.target.value,
        })
    }, [registrationForm, setRegistrationForm]);

    const goToSignIn = useCallback(() => {
        push("/auth/sign-in");
    }, [push]);

    const signUp = async () => {
       try {
           await dispatch(Register(registrationForm));
       } catch (err) {
           alert(`Failed to sign Up, error: ${err}`);
       }
    }

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
                <Face/>
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
                <TextField onChange={changeFormData} name="name" label="Username" type="text" fullWidth autoFocus required/>
            </Grid>
        </Grid>
        <Grid container spacing={8} alignItems="flex-end">
            <Grid item>
                <Fingerprint/>
            </Grid>
            <Grid item md={true} sm={true} xs={true}>
                <TextField onChange={changeFormData} name="password" id="username" label="Password" type="password" fullWidth required/>
            </Grid>
        </Grid>
        <Grid container justify="center" style={{marginTop: '30px'}}>
            <Button onClick={signUp} variant="outlined" color="primary" style={{textTransform: "none"}}>Register</Button>
        </Grid>
        <Grid container justify="center" style={{marginTop: '10px'}}>
            <Button onClick={goToSignIn} disableFocusRipple disableRipple style={{textTransform: "none"}} variant="text"
                    color="primary">Sign
                In</Button>
        </Grid>
    </Paper>
}
