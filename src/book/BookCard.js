import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { green } from '@material-ui/core/colors';
import Tooltip from '@material-ui/core/Tooltip';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Avatar } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: 240,
    },
    title: {
        fontSize: 16,
    },
    media: {
        height: 220,
    },
    green: {
        color: '#fff',
        backgroundColor: green[500], 
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    moveBtn: {
        marginLeft: 'auto'
    }
}));

const BookCard = (props) => {
    const {book} = props;
    const classes = useStyles();
    
    return (
        <Paper elevation={4} className={classes.root}>
            <Card >
                <CardActionArea>
                    <CardHeader 
                        title={ 
                            <Typography className={classes.title} component="h2">
                                {book.title}
                            </Typography>
                        }
                    />
                    <CardMedia
                        className={classes.media}
                        image={book.imageLinks.thumbnail}
                        title={book.title}
                    />
                    <CardContent>
                        {book.authors.map(author => (
                            <Chip key={book.title+author} size="small" label={author} icon={<FaceIcon />} />    
                        ))}
                    </CardContent>
                </CardActionArea>
                <CardActions disableSpacing>
                    <Avatar size="small" className={classes.green}>
                        <Tooltip title="Reading">
                            <VisibilityIcon />
                        </Tooltip>
                    </Avatar>
                    
                    <Button size="small" color="primary" className={classes.moveBtn}>
                        <Tooltip title="Move to another shelf">
                            <SwapHorizIcon />
                        </Tooltip>
                    </Button>
                </CardActions>
            </Card>
        </Paper>
    );

}

export default BookCard;