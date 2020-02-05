import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';

const Author = (props) => {
    const {author} = props;
    return (
        <Chip  size="small" label={author} icon={<FaceIcon />} />
    );
}

Author.propTypes = {
    author: PropTypes.string.isRequired
}

export default Author;