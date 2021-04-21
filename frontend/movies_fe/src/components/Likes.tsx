import React, {useMemo} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/store";
import {DisLikeMovie} from "../store/user/userActions";
import {Wrapper} from "./Movies";
import {IMovie} from "../models/movie";
import {Movie} from "./Movie";
import NoImg from "../media/no_img.png";

export const Likes: React.FC = () => {
    const likedMovies = useSelector((state: RootState) => state.user.user.likes);
    const userId = useMemo(() => localStorage.getItem('userId') as string, []);
    const dispatch = useDispatch();

    const onDisLike = async (id: number) => {
        await dispatch(DisLikeMovie(id, userId));
    }
    return <Wrapper>
        {likedMovies.map((m: IMovie) => <Movie
            key={m.show.id}
            onLikeClick={() => {}}
            id={m.show.id}
            onDislikeClick={onDisLike}
            img={m.show.image ? m.show.image.medium : NoImg}
            name={m.show.name}
            description={m.show.summary}
            isLiked={true}
        />)}
    </Wrapper>
}
