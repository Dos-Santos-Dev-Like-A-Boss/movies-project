import React, {useEffect, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {FetchFilms} from "../store/movies/moviesAction";
import {RootState} from "../store/store";
import {IMovie} from "../models/movie";
import {Movie} from "./Movie";
import NoImg from "../media/no_img.png";
import styled from "styled-components";
import {DisLikeMovie, LikeMovie} from "../store/user/userActions";
import {Button, TextField} from "@material-ui/core";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    width: 1000px;
    margin: 20px auto;
    flex-wrap: wrap;
    @media all and (max-width: 1120px) {
      width: 100%;
    }
`;

const Form = styled.form`
    padding: 25px;
    width: 500px;
    margin: 0 auto;
    display: flex;
    align-items: center;
`;

export const Movies: React.FC = () => {
    const [search, setSearch] = useState("welcome");
    const dispatch = useDispatch();

    const userId = useMemo(() => localStorage.getItem('userId') as string, []);

    const movies = useSelector((state: RootState) => state.movies.movies);
    const likedMovies = useSelector((state: RootState) => state.user.user.likes);
    useEffect(() => {
        dispatch(FetchFilms(search));
    }, [dispatch]);

    const onLike = async (id: number) => {
        const movie: IMovie = movies.find((movie: IMovie) => movie.show.id === id);
        await dispatch(LikeMovie(movie, userId));
    }

    const onDisLike = async (id: number) => {
        await dispatch(DisLikeMovie(id, userId));
    }

    const onSearch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();
        await dispatch(FetchFilms(search));
    }

    return <>
        <Form onSubmit={onSearch}>
            <TextField
                value={search}
                style={{width: 300}} onChange={e => setSearch(e.target.value)} id="outlined-search" type="search" variant="outlined" />
                &nbsp;
            <Button type="submit" variant="contained">Search for movies...</Button>
        </Form>
        <Wrapper>
            {movies.map((m: IMovie) => <Movie
                key={m.show.id}
                onLikeClick={onLike}
                id={m.show.id}
                onDislikeClick={onDisLike}
                img={m.show.image ? m.show.image.medium : NoImg}
                name={m.show.name}
                description={m.show.summary}
                isLiked={likedMovies.some((liked: IMovie) => liked.show.id === m.show.id)}
            />)}
        </Wrapper>
    </>
}
