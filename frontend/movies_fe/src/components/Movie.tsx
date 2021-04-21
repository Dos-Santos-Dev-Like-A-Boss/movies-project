import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography
} from "@material-ui/core";
import React from "react";
import FavoriteIcon from '@material-ui/icons/Favorite';
import NotInterestedIcon from '@material-ui/icons/NotInterested';

const useStyles = makeStyles({
    root: {
        width: 300,
        margin: 10,
    },
    media: {
        height: 140,
    },
    cardContent: {
      height: 200,
      overflowY: "scroll"
    },
    likeText: {
        display: "flex",
        alignItems: "center"
    }
});

interface IProps {
    img: string;
    name: string;
    isLiked: boolean;
    id: number;
    description: string;
    onLikeClick(id: number): void;
    onDislikeClick(id: number): void;
}

export const Movie: React.FC<IProps> = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.img}
                    title="Contemplative Reptile"
                />
                <CardContent className={classes.cardContent}>
                    <Typography style={{height: 70, alignItems: "center"}} gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        <div dangerouslySetInnerHTML={{__html: props.description}}>

                        </div>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => {
                        if(props.isLiked) {
                            props.onDislikeClick(props.id);
                        } else {
                            props.onLikeClick(props.id);
                        }
                    }}
                >
                    {props.isLiked ?
                        <span className={classes.likeText}><NotInterestedIcon /> &nbsp;Not interested </span> :
                        <span className={classes.likeText}><FavoriteIcon /> &nbsp;Like </span>
                    }
                </Button>
            </CardActions>
        </Card>
    );
}
