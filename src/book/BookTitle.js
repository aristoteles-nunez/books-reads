import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const BookTitle = (props) => {
    const {title, className} = props;
    return (
        <div>
            <Typography className={className} gutterBottom variant="h5" component="h2">
                {title}
            </Typography>
        </div>
    );
}

BookTitle.propTypes = {
    title: PropTypes.string.isRequired
}

export default BookTitle;