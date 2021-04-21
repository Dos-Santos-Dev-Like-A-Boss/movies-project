import React, {useEffect} from "react";
import {Route, useHistory} from "react-router-dom";
import {SignUp} from "../components/SignUp";
import {SignIn} from "../components/SignIn";
import { Grid } from "@material-ui/core";
import styled from "styled-components";
import MovieBg from '../media/movie_bh.jpeg';
import {useSelector} from "react-redux";
import {RootState} from "../store/store";

const Wrapper = styled.div`
    background-image: url(${MovieBg});
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
`;

export const AuthModule: React.FC = () => {
    const { push } = useHistory();
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
    useEffect(() => {
        if(isLoggedIn) {
            push("/");
        }
    }, [isLoggedIn, push]);

    return <Wrapper>
        <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            <Route path="/auth/sign-in">
                <SignIn />
            </Route>
            <Route path="/auth/sign-up">
                <SignUp />
            </Route>
        </Grid>
    </Wrapper>
}
