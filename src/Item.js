/*
 * CS 3744 Fall 2023
 * Item JS Source Code
 * BarChart JS Source Code
 *
 * Author: Shreya Ashok Kumar
 * Version: 1.0
*/
import './Item.css';
import {Box} from "@mui/material";

const Item = () => {


    return (
        <Box className="Box" sx= {{ 
            position: 'relative',
            top: '5%',
            left: '5%',
            width: '100%',
            height: '80px',
            border: '1px solid black',
        }}
        > </Box>
    )
};

export default Item;