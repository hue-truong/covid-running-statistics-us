import * as React from 'react';
import { useState } from 'react';
import { Chart } from "react-google-charts";
import ToolUI from '../Components/ToolUI'
import { Card, Box } from "@mui/material"

const GraphPage = () => {
    const [data, setData] = useState([])
    const [metric, setMetric] = useState("Total Confirmed Cases")

    return (
        <>
            <div className="container">
                <div className='tool-box'>
                    <ToolUI metric={metric} data={data} onChange={setData} setMetric={setMetric} />
                </div>
                <Card sx={{ width: 1550 }}>
                    <div className='graph'>
                        <Chart
                            chartType="LineChart"
                            data={data}
                            height="700px"
                            width="1700px"
                            options={{
                                title: metric,
                                focusTarget: 'category',
                                explorer: {
                                    keepInBounds: true,
                                    maxZoomOut: 1,
                                    zoomDelta: 1.1
                                }
                            }} />
                    </div>

                </Card>

            </div>
        </>

    );

}

export default GraphPage;