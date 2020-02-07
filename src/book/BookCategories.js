import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import BookList from './BookList';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
}));

const arrayIndexToArrayObjects = (arrayIndex, booksObj) => {
    const result = arrayIndex.map((element) => booksObj[element]);
    return result;
}

const BookCategories = (props) => {
    const {books, handleShelfChange, currentlyReading, wantToRead, read} = props;
    const booksCurrentlyReading = arrayIndexToArrayObjects(currentlyReading, books);
    const booksWantToRead = arrayIndexToArrayObjects(wantToRead, books);
    const booksRead = arrayIndexToArrayObjects(read, books);
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} centered >
                    <Tab label="Reading" {...a11yProps(0)} />
                    <Tab label="Want to read" {...a11yProps(1)} />
                    <Tab label="Read" {...a11yProps(2)} />
                    <Tab label="All" {...a11yProps(3)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <BookList books={booksCurrentlyReading} handleShelfChange={handleShelfChange}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <BookList books={booksWantToRead}  handleShelfChange={handleShelfChange}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <BookList books={booksRead} handleShelfChange={handleShelfChange}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <BookList books={[...booksCurrentlyReading,...booksWantToRead, ...booksRead]} handleShelfChange={handleShelfChange}/>
            </TabPanel>

        </div>
    );
    
}

BookCategories.propTypes = {
    books: PropTypes.object.isRequired,
    handleShelfChange: PropTypes.func.isRequired,
    currentlyReading: PropTypes.array.isRequired, 
    wantToRead: PropTypes.array.isRequired, 
    read: PropTypes.array.isRequired
}

export default BookCategories;