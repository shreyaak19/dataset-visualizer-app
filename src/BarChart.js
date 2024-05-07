/*
 * CS 3744 Fall 2023
 * Project 1
 * BarChart JS source code
 *
 * Author: Shreya Ashok Kumar
 * Version: 1.0
 */

import './BarChart.css';
import React, {useEffect} from 'react';
import * as d3 from 'd3';
import {Box} from "@mui/system";

let didMount = true;

const BarChart = (props) => {
    let myReference = React.createRef();
    let svg = null;
    let dataset = props.dataset;
    let settings = {
        viewBox: {
            x: 0,
            y: 0,
            width: 100,
            height: 100
        },
        title: {
            x: 0,
            y: 0,
            width: 100,
            height: 10,
            baseline: 5
        },
        labels: {
            x: 9,
            y: 91,
            width: 91,
            height: 5,
            baseline: 2,
            length: 0.5
        },
        labelsTitle: {
            x: 5,
            y: 96,
            width: 95,
            height: 4,
            baseline: 2,
            text: "",
        },
        valuesTitle: {
            x: 0,
            y: 6,
            width: 4,
            height: 90,
            baseline: 2,
            text: "",
        },
        values: {
            x: 4,
            y: 6,
            width: 5,
            height: 90,
            baseline: 4.5
        },
        lines: {
            margin: 1.5
        },
        bars: {
            x: 9,
            y: 10,
            width: 91,
            height: 85,
            ratio: 0.7
        },
        data: {
            min: 0,
            max: 0,
            step: 0.5
        },
    };
    if (dataset.data !== null && dataset.data.length > 0) {
        settings.data.max = d3.max(dataset.data, data => data[Object.keys(dataset.data[0])[1]]);
        settings.labelsTitle.text = Object.keys(dataset.data[0])[0];
        settings.valuesTitle.text = Object.keys(dataset.data[0])[1];
    }
    const init = () => {
        let container = d3.select(myReference.current);
        container
            .selectAll("*")
            .remove();
        svg = container
            .append("svg")
            .attr("viewBox", settings.viewBox.x + " " + settings.viewBox.y + " " + settings.viewBox.width + " " + settings.viewBox.height)
            .attr("preserveAspectRatio", "none")
            .style("border", "none");
    }

    const paint = () => {
        if (svg) {
        svg
            .selectAll("*")
            .remove();

        svg
            .append("g")
            .attr("id", "title")
            .append("text")
            .attr("x", (settings.title.x + settings.title.width) / 2)
            .attr("y", settings.title.y + settings.title.height - settings.title.baseline)
            .text(dataset.title);

        if (dataset.data != null && dataset.data.length > 0) {
        
        let dataRange = settings.data.max - settings.data.min;
        let lineCount = dataRange / settings.data.step;
        svg
            .append("g")
            .attr("id", "lines")
            .selectAll("line")
            .data(d3.range(lineCount))
            .enter()
            .append("line")
            .attr("x1", settings.values.x + settings.values.width)
            .attr("x2", settings.values.x + settings.values.width + settings.bars.width - settings.lines.margin )
            .attr("y1", (item, index) => {
                return settings.labels.y - index * settings.bars.height / lineCount;
            })
            .attr("y2", (item, index) => {
                return settings.labels.y - index * settings.bars.height / lineCount;
            });

        svg
            .append("g")
            .attr("id", "bars")
            .selectAll("rect")
            .data(dataset.data)
            .enter()
            .append("rect")
            .attr("x", (item , index) => {
                return settings.bars.x + (1 - settings.bars.ratio + index) * settings.bars.width / (dataset.data.length + 1 - settings.bars.ratio);
            })
            .attr("y", (item , index) => {
                console.log( dataRange);
                return settings.labels.y - (Object.values(item)[1] - settings.data.min) * settings.bars.height / dataRange;
            })
            .attr("width", settings.bars.ratio * settings.bars.width / (dataset.data.length + 1 - settings.bars.ratio))
            .attr("height", (item , index) => {
                return (Object.values(item)[1] - settings.data.min) * settings.bars.height / dataRange;
            });

        svg
            .append("g")
            .attr("id", "otherTitles")
            .append("text")
            .attr("x", (settings.labelsTitle.x + settings.labelsTitle.width + settings.labelsTitle.text.length) / 2)
            .attr("y", settings.labelsTitle.y + settings.labelsTitle.height - settings.labelsTitle.baseline)
            .text(settings.labelsTitle.text);
        
        svg
            .append("g")
            .attr("id", "otherTitles")
            .selectAll("text")
            .data(settings.valuesTitle.text.split(""))
            .enter()
            .append("text")
            .attr("x", (item, index) => {
                return (settings.valuesTitle.x + settings.valuesTitle.width) / 2
            })
            .attr("y", (item, index) => {
                return (settings.valuesTitle.y - settings.valuesTitle.text.length + settings.valuesTitle.height - settings.labelsTitle.baseline) / 2 + (index * 2.5)
            })
            .text((item) => {
                return item
            });

        let labels = svg
            .append('g')
            .attr('id', 'labels');
        labels
            .selectAll('text')
            .data(dataset.data)
            .enter()
            .append('text')
            .attr('x', (item , index) => {
                return settings.labels.x + (1 - settings.bars.ratio + index + settings.bars.ratio / 2) * settings.bars.width / (dataset.data.length + 1 - settings.bars.ratio);
            })
            .attr('y', settings.labels.y + settings.labels.height - settings.labels.baseline)
            .text((item, index) => {
                return item[Object.keys(dataset.data[0])[0]];
            });
        labels
            .selectAll('line')
            .data(dataset.data)
            .enter()
            .append('line')
            .attr("y1", settings.labels.y)
            .attr("y2", settings.labels.y + settings.labels.length)
            .attr("x1", (item, index) => {
                return settings.labels.x + (1 - settings.bars.ratio + index + settings.bars.ratio / 2) * settings.bars.width / (dataset.data.length + 1 - settings.bars.ratio);
            })
            .attr("x2", (item, index) => {
                return settings.labels.x + (1 - settings.bars.ratio + index + settings.bars.ratio / 2) * settings.bars.width / (dataset.data.length + 1 - settings.bars.ratio);
            });

        svg
            .append("g")
            .attr("id", "values")
            .selectAll("text")
            .data(d3.range(lineCount))
            .enter()
            .append("text")
            .attr("x", settings.values.x + settings.values.width / 2)
            .attr("y", (item, index) => {
                return settings.values.y + settings.values.height - settings.values.baseline - index * settings.bars.height / lineCount;
            })
            .text((item, index) => {
                return (settings.data.min + item * settings.data.step).toFixed(1);
            });
        }
        }
    }

    useEffect(() => {
        if (didMount) {
            didMount = false;
            init();
        }
        paint();
    });

    useEffect(() => {
        
        init();
        paint();
    }, [props.dataset]);

    return(
        <Box ref={myReference}>
        </Box>
    );

}

export default BarChart;
