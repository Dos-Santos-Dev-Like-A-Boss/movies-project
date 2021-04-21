import a, {AxiosResponse} from "axios";
import {IUser} from "./models/user";
import {IMovie} from "./models/movie";
import {RegisterUserDto} from "./store/user/userActions";

const axios = a.create({
    baseURL: "http://localhost:3001/api"
});

export class Apis {
    static whoAmI(token: string) {
        return axios.post("/whoami", { token });
    }

    static signIn(email: string, password: string): Promise<AxiosResponse<IUser>> {
        return axios.post("/sign-in", { email, password });
    }

    static signUp(data: RegisterUserDto): Promise<AxiosResponse<IUser>> {
        return axios.post("/sign-up", data);
    }

    static fetchFilms(q: string): Promise<AxiosResponse<IMovie[]>> {
        return a.get("http://api.tvmaze.com/search/shows", {params: {q}});
    }

    static likeMovie(movie: IMovie, userId: string): Promise<AxiosResponse<IUser>> {
        return axios.post(`/like/${movie.show.id}`, movie, {headers: {userId}});
    }

    static dislikeMovie(movieId: number, userId: string): Promise<AxiosResponse<IUser>> {
        return axios.delete(`/like/${movieId}`, {headers: {userId}});
    }
}
