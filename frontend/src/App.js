import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Chart } from "react-google-charts";
import "react-widgets/styles.css";
import 'rc-slider/assets/index.css';
import STATES from './states'
import { DropdownList, Multiselect, DatePicker } from 'react-widgets';

const metricOptions = [
'Total Confirmed Cases', 'New Daily Cases', 
'Weekly Rolling Average New Daily Cases', 'New Daily Cases per 200000',
'Weekly Rolling Average New Daily Cases per 200000',
'Total Confirmed Deaths', 'New Daily Deaths',
'Weekly Rolling Average New Daily Deaths', 'New Daily Deaths per 200000',
'Weekly Rolling Average New Daily Deaths per 200000',
'Proportion of the State Fully Vaccinated', 'Mandate?', 
'Mask Compliance', 'Mortality']

const App = () =>{
  const [startDate, setStart] = useState(new Date('2020-1-20'));
  const [endDate, setEnd] = useState(new Date('2022-1-5'));
  const [droplist, setDrop] = useState(["Massachusetts"])
  const droparray = useRef([])

  const [data, setData] = useState([])

  const [metric, setMetric] = useState("Total Confirmed Cases")

  useEffect(()=>{
    axios.post('http://127.0.0.1:5000/', {
      states: droplist,
      start_d: startDate,
      end_d: endDate,
      metric: metric
    })
    .then(r => {
      let response = r.data.data
      setData(response.map(x => {
        let temp = new Date(new Date(x[0]).toDateString());
        x.shift()
        return [temp, ...x]
      }))
    })
  }, [droplist, metric, startDate, endDate])

  let handleList = () => {
    setDrop(droparray.current.getSelectedItems().map(x => x.value ))
  }

  let handleMultiSelectonChange = (e) => {
    if(e.includes('Clear All')){
      setDrop([])
    }
    else if (e.includes('Select All')){
      setDrop(STATES)
    }
    else{
      setDrop(e)
    }
  }

  return (
    <div >
      <div className="container">
        <div className="toolui">
          <DropdownList data={metricOptions} value={metric} onChange={(e) => { setMetric(e); }}/>
          <DatePicker value={startDate} onChange={(date) => setStart(date)} />
          <DatePicker value={endDate} onChange={(date) => setEnd(date)} />
          <Multiselect data={['Clear All', 'Select All', ...STATES]} value={droplist} onChange={handleMultiSelectonChange}/>
        </div>
        <div className="figure">
          <Chart chartType="LineChart" data={data} height="500px" width="1500px" options= {{title: metric, focusTarget: 'category'} }/>
        </div>
      </div>
      <div className="state-selection">
      </div>
    </div>
  );

}

export default App;