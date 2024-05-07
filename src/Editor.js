/*
 * CS 3744 Fall 2023
 * Project 1
 * Editor JS Source Code
 *
 * Author: Shreya Ashok Kumar
 * Version: 1.0
*/
import './Editor.css';
import React, {useState, useEffect} from 'react';
import { Paper, Input, TableBody, TableContainer, TableHead, TableRow, Table, TableCell, TextField } from '@mui/material';

const Editor = (props) => {
    const[dataSet, setDataSet] = useState(props.dataset);

    useEffect(() => {
        console.log("before dataset: ", dataSet);
        setDataSet(props.dataset);
        }, [props.dataset]);

    return (
        <div>
            {dataSet.data !== null && dataSet.data.length > 0 && (
            <TableContainer sx={{ position: 'relative', top: '5px', width: '100%' }}>
                <Table size="small" cellpadding="0" cellspacing="0" border="0" sx={{ borderSpacing: '0', textAlign: 'left', width: '70%' }}>
                    <TableHead>
                        <TableRow sx={{ display: 'block' }}>
                            <TableCell sx={{ display: 'block', padding: '1px', textAlign: 'center', borderBottom: 'none' }}>
                                <TextField
                                    InputProps={{
                                        inputProps: {
                                            style: { textAlign: "right", maxWidth: '100%', padding: '2px' },
                                        }
                                    }}
                                    className="textFields"
                                    size="small"
                                    value={dataSet.title}
                                    onChange={(e) => handleTitleChange(e)}
                                    sx={{ border: '1px solid black', borderRadius: '5px' }}
                                ></TextField>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow sx={{ display: 'block' }}>
                            <TableCell sx={{ padding: '1px' }}>
                                <TextField
                                    InputProps={{
                                        inputProps: {
                                            style: { textAlign: "right", display: 'block', maxWidth: '100%', margin: '0', padding: '2px' },
                                        }
                                    }}
                                    sx={{ minWidth: '20ch', width: 'auto', display: 'block', borderBottom: 'none', border: '1px solid black', borderRadius: '5px' }}
                                    size="small"
                                    value={Object.keys(dataSet.data[0])[0]}
                                    onChange={(e) => handleXLabelChange(e)}
                                ></TextField>
                            </TableCell>
                            <TableCell sx={{ padding: '1px' }}>
                                <TextField
                                    InputProps={{
                                        inputProps: {
                                            style: { textAlign: "right", maxWidth: 'none', margin: '0', padding: '2px' },
                                        }
                                    }}
                                    sx={{ minWidth: '20ch', width: 'auto', display: 'block', borderBottom: 'none', border: '1px solid black', borderRadius: '5px' }}
                                    size="small"
                                    value={Object.keys(dataSet.data[0])[1]}
                                    onChange={(e) => handleYLabelChange(e)}
                                ></TextField>
                            </TableCell>
                        </TableRow>
                        {dataSet.data.map((element, index) => (
                            <TableRow sx={{ display: 'block' }}>
                                <TableCell sx={{ padding: '1px' }}>
                                    <TextField
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right", maxWidth: 'none', margin: '0', padding: '2px' },
                                            }
                                        }}
                                        sx={{ minWidth: '20ch', width: 'auto', display: 'block', borderBottom: 'none', border: '1px solid black', borderRadius: '5px' }}
                                        size="small"
                                        value={element[Object.keys(dataSet.data[0])[0]]}
                                        onChange={(e) => {
                                            handleDataSetChange(e, Object.keys(dataSet.data[0])[0], index);
                                        }}
                                    ></TextField>
                                </TableCell>
                                <TableCell sx={{ padding: '1px' }}>
                                    <TextField
                                        InputProps={{
                                            inputProps: {
                                                style: { textAlign: "right", maxWidth: 'none', margin: '0', padding: '2px' },
                                            }
                                        }}
                                        sx={{ minWidth: '20ch', width: 'auto', display: 'block', borderBottom: 'none', border: '1px solid black', borderRadius: '5px' }}
                                        size="small"
                                        value={element[Object.keys(dataSet.data[0])[1]]}
                                        onChange={(e) => {
                                            handleDataSetChange(e, Object.keys(dataSet.data[0])[1], index);
                                        }}
                                    ></TextField>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            /* <Button>
            
            </Button> */
            )}
        </div>
    )

    function handleTitleChange(e) {
        const newTitle = e.target.value;
        const newDataSet = {...dataSet};
        newDataSet.title = newTitle;
        setDataSet(newDataSet);
        props.handleTitle(e);
    }
    
    function handleXLabelChange(e) {
        const xLabel = Object.keys(dataSet.data[0])[0];
        const yLabel = Object.keys(dataSet.data[0])[1];
        const newXLabel = e.target.value;
        const newDataSet = {...dataSet};
        newDataSet.data = newDataSet.data.map((element) => {
            const firstValue = element[xLabel];
            const secondValue = element[yLabel];
            const newElement = { [newXLabel]: firstValue, [yLabel]: secondValue };
            return newElement;
        });
        setDataSet(newDataSet);
        console.log("after dataset: ", dataSet);
        props.handleXLabel(e);
    }
    
    function handleYLabelChange(e) {
        const xLabel = Object.keys(dataSet.data[0])[0];
        const yLabel = Object.keys(dataSet.data[0])[1];
        const newYLabel = e.target.value;
        const newDataSet = {...dataSet};
        newDataSet.data = newDataSet.data.map((element) => {
            const firstValue = element[xLabel];
            const secondValue = element[yLabel];
            const newElement = { [xLabel]: firstValue, [newYLabel]: secondValue };
            return newElement;
        });
        setDataSet(newDataSet);
        props.handleYLabel(e);
    }
    
    function handleDataSetChange(e, label, index) {
        const newDataSet = {...dataSet};
        newDataSet.data[index][label] = e.target.value;
        setDataSet(newDataSet);
        props.handleDataSet(e, label, index);
    }
};



export default Editor;