/*
 * CS 3744 Fall 2023
 * Project 1
 * MenuBar JS Source Code
 *
 * Author: Shreya Ashok Kumar
 * Version: 1.0
*/
import './MenuBar.css';
import React, {useState} from "react";
import {Box, Button, Menu, MenuItem, AppBar, TextField, Toolbar, Typography, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText} from "@mui/material";

const MenuBar = (props) => {
    const [anchorFile, setAnchorFile] = useState(null);
    const isFileOpen = Boolean(anchorFile);
    const[loadPopUp, setLoadPopUp] = useState(false);
    const [isLoadPopUpOpen, setLoadPopUpOpen] = useState(false);
    const [newFile, setNewFile] = useState(null);
    const[NewPopUp, setNewPopUp] = useState(false);
    const [isNewPopUpOpen, setNewPopUpOpen] = useState(false);
    const[SaveAsPopUp, setSaveAsPopUp] = useState(false);
    const [isSaveAsPopUpOpen, setSaveAsPopUpOpen] = useState(false);
    const [currentFile, setCurrentFile] = useState(props.currentFile)
    const handleClickFile = (e) => {
        setAnchorFile(e.currentTarget);
    };
    const handleCloseFile = () => {
        setAnchorFile(null);
    };

    const handleNewFile = () => {
        setNewPopUpOpen(true);
        setNewPopUp(false);
    };

    const handleNewData = (e) => {
        if (newFile) {
            const dataNew = {
                title: newFile,
                data: []
            };
            localStorage.setItem(newFile, JSON.stringify(dataNew));
            setCurrentFile(newFile);
            props.handleCurrentFile(newFile, dataNew);
        }
        handleCloseNew();
        handleCloseFile();
        setNewFile(null);
    }

    const handleCloseNew = () => {
        setNewPopUpOpen(false);
        handleCloseFile();
    }

    const handleLoadData = (key) => {
        const dataLoad = localStorage.getItem(key);
        if (dataLoad) {
            const dataParsed = JSON.parse(dataLoad);
            setCurrentFile(key);
            props.handleCurrentFile(key, dataParsed);
        }
        handleCloseLoad();
        handleCloseFile();
    }

    const handleLoadFile = () => {
        setLoadPopUpOpen(true);
        setLoadPopUp(false);
    }

    const handleCloseLoad = () => {
        setLoadPopUpOpen(false);
        handleCloseFile();
    }

    const handleSaveFile = () => {
        if (currentFile) {
            props.handleSaveFile();
        }
        handleCloseFile();
    };


    const handleSaveAsFile = () => {
        setSaveAsPopUpOpen(true);
        setSaveAsPopUp(false);
    };

    const handleCloseSaveAs = () => {
        setSaveAsPopUpOpen(false);
        handleCloseFile();
    }

    const handleSaveAs = () => {
        if (newFile) {
            props.handleSaveAsFile(newFile);
        }
        handleCloseSaveAs();
        handleCloseFile();
        setNewFile(null);
    }

    return(
        <Box sx={{ flexGrow: 1, m: 0.5 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button
                        id="file-button"
                        aria-controls={isFileOpen ? 'fade-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={isFileOpen ? 'true' : undefined}
                        onClick={handleClickFile}
                        sx={{ bgcolor: 'white', color: 'blue', m: 0.5 }}
                    >
                        File
                    </Button>
                    <Dialog
                        open={isLoadPopUpOpen}
                        onClose={handleCloseLoad}
                    >
                        <DialogTitle> Select a file to load</DialogTitle>
                        <DialogContent>
                            <List>
                                {(Object.keys(localStorage)).map((key, index) => (
                                    (key !== 'debug') && (
                                        <ListItem key={index} onClick={() => handleLoadData(key)}>
                                            <ListItemText primary={`Load Data From File: ${key}`} />
                                        </ListItem>
                                    )
                                ))}
                            </List>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseLoad}> Cancel</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={isNewPopUpOpen}
                        onClose={handleCloseNew}
                    >
                        <DialogTitle> Enter File Name</DialogTitle>
                        <DialogContent>
                            <TextField label="File Name" value={newFile} onChange={(e) => setNewFile(e.target.value)}>
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseNew}> Cancel</Button>
                            <Button onClick={handleNewData}> Save</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={isSaveAsPopUpOpen}
                        onClose={handleCloseSaveAs}
                    >
                        <DialogTitle> Enter File Name to Save As</DialogTitle>
                        <DialogContent>
                            <TextField label="File Name" value={newFile} onChange={(e) => setNewFile(e.target.value)}>
                            </TextField>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseSaveAs}> Cancel</Button>
                            <Button onClick={handleSaveAs}> Save</Button>
                        </DialogActions>
                    </Dialog>
                    <Menu
                        id="file-menu"
                        MenuProps={{
                            'aria-labelledby': 'file-button',
                        }}
                        anchorEl={anchorFile}
                        open={isFileOpen}
                        onClose={handleCloseFile}
                    >
                        <MenuItem onClick={handleNewFile}>New</MenuItem>
                        <MenuItem onClick={handleLoadFile}>Load</MenuItem>
                        <MenuItem onClick={handleSaveFile}>Save</MenuItem>
                        <MenuItem onClick={handleSaveAsFile}>Save As</MenuItem>
                    </Menu>
                    <Typography variant="h6" component="div" align="center" width="100%">
                        Project 1
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>

    );
};

export default MenuBar;