import * as React from 'react';
import { useState } from 'react';
import { Chart } from "react-google-charts";
import ToolUI from '../Components/ToolUI'
import { Card } from "@mui/material"

const GraphPage = () => {
  const [data, setData] = useState([])
  const [metric, setMetric] = useState("Total Confirmed Cases")

  return (
    <div className="container">
      <Card>
        <Chart
          chartType="LineChart"
          data={data}
          height="700px"
          width="1400px"
          options={{
            title: metric,
            focusTarget: 'category',
            explorer: {
              keepInBounds: true,
              maxZoomOut: 1,
              zoomDelta: 1.1
            }
          }} />
      </Card>
        <ToolUI
          onChange={(e) => { setData(e) }} metric={metric}
          setMetric={setMetric} />
    </div>
  );

}

export default GraphPage;