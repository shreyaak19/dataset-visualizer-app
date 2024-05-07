/*
 * CS 3744 Fall 2023
 * Project 1
 * App JS source code
 *
 * Author: Shreya Ashok Kumar
 * Version: 1.0
 */

import './App.css';
import BarChart from './BarChart';
import MenuBar from './MenuBar';
import Editor from './Editor';
import configuration from './pr1.json';
import {Box, Container} from "@mui/material";
import React, {useState} from "react";
import './load.js';

const App = () => {
  const[file, setFile] = useState('pr1.json');
  const[data, setData] = useState(configuration);

  return (
    <Container className="App" sx={{ position: 'absolute', width: '100%', height: '100vh' }}>
      <MenuBar
        currentFile={file}
        handleCurrentFile={handleCurrentFile}
        handleSaveFile={handleSaveFile}
        handleSaveAsFile={handleSaveAsFile}
      >
      </MenuBar>
      <Box className="body-box" sx={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(2, 1fr)',
        }}>
          <Box className="comp-box">
            <Editor
              dataset={data}
              handleTitle={handleTitle}
              handleXLabel={handleXLabel}
              handleYLabel={handleYLabel}
              handleDataSet={handleDataSet}
            >
            </Editor>
          </Box>
          <Box className="comp-box" sx={{ left: '2%' }}>
            <BarChart 
                dataset={data}
                sx={{ bgcolor: 'white', width: '100%', height: '100%' }}
            >
            </BarChart>
          </Box>
      </Box>
    </Container>
  )

  function handleTitle(e) {
    const newTitle = e.target.value;
    const newData = {...data};
    newData.title = newTitle;
    setData(newData);
  }

  function handleXLabel(e) {
    const xLabel = Object.keys(data.data[0])[0];
    const yLabel = Object.keys(data.data[0])[1];
    const newXLabel = e.target.value;
    const newData = {...data};
    newData.data = newData.data.map((element) => {
      const firstValue = element[xLabel];
      const secondValue = element[yLabel];
      const newElement = { [newXLabel]: firstValue, [yLabel]: secondValue };
      return newElement;
    });
    setData(newData);
  }

  function handleYLabel(e) {
    const xLabel = Object.keys(data.data[0])[0];
    const yLabel = Object.keys(data.data[0])[1];
    const newYLabel = e.target.value;
    const newData = {...data};
    newData.data = newData.data.map((element) => {
      const firstValue = element[xLabel];
      const secondValue = element[yLabel];
      const newElement = { [xLabel]: firstValue, [newYLabel]: secondValue };
      return newElement;
    });
    setData(newData);
  }

  function handleDataSet(e, label, index) {
    const newData = {...data};
    newData.data[index][label] = e.target.value;
    setData(newData);
  }

  function handleCurrentFile(key, newDataSet) {
    setData(newDataSet);
    setFile(key);
  }

  function handleSaveFile() {
    if (file) {
      localStorage.setItem(file, JSON.stringify(data));
    }
  }

  function handleSaveAsFile(newFile) {
    localStorage.setItem(newFile, JSON.stringify(data));
  }
};

export default App;

