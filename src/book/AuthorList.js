import React from 'react';
import PropTypes from 'prop-types';
import Author from './Author';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const AuthorList = (props) => {
    const {authors} = props;
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {
                authors.map(author => (
                    <Author key={author} author={author} />
                ))
            }
        </div>
    );
}
AuthorList.propTypes = {
    authors: PropTypes.array.isRequired
}

export default AuthorList;