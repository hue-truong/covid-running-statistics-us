import * as React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "react-widgets/styles.css";
import { Card } from "@mui/material"
import { DropdownList, Multiselect, DatePicker } from 'react-widgets';

const ToolUI = (props) => {
    const [startDate, setStart] = useState(new Date('2020-1-20'));
    const [endDate, setEnd] = useState(new Date('2022-1-5'));
    const [droplist, setDrop] = useState(["Massachusetts"])
    const [dropBool, setBool] = useState(["Massachusetts"])

    useEffect(() => {
        axios.post('http://127.0.0.1:5000/', {
            states: droplist,
            start_d: startDate,
            end_d: endDate,
            metric: props.metric
        })
            .then(r => {
                let response = r.data.data
                props.onChange(response.map(x => {
                    let temp = new Date(new Date(x[0]).toDateString());
                    x.shift()
                    return [temp, ...x]
                }))
            })
    }, [droplist, props.metric, startDate, endDate])

    let handleMultiSelectonChange = (e) => {
        if (e.includes('Clear All')) {
            if (e.length === 1) { setBool(e);}
            setDrop(dropBool)
        }
        else if (e.includes('Select All')) {
            setDrop(STATES)
        }
        else if(e.length > 0){
            if (e.length === 1) { setBool(e);}
            setDrop(e)
        }
        else{
            setDrop(dropBool)
        }
    }

    return (
        <Card className="toolui-card">
            <div className="toolui">
                Metric:
                <DropdownList data={metricOptions} value={props.metric} onChange={(e) => { props.setMetric(e); }} />
                <br />
                start From:
                <DatePicker value={startDate} onChange={(date) => setStart(date)} />
                <br />
                To:
                <DatePicker value={endDate} onChange={(date) => setEnd(date)} />
                <br />
                State(s):
                <Multiselect className='multiselect' data={['Clear All', 'Select All', ...STATES]} value={droplist} onChange={handleMultiSelectonChange} />
            </div>
        </Card>
    );

}

const metricOptions = [
    'Total Confirmed Cases', 'New Daily Cases',
    'Weekly Rolling Average New Daily Cases',
    'Total Confirmed Deaths', 'New Daily Deaths',
    'Weekly Rolling Average New Daily Deaths',
    'Proportion of the State Fully Vaccinated', 'Mandate?',
    'Mask Compliance', 'Mortality', 'Weekly Rolling Average New Daily Cases per 200000']

const STATES = [
    "Alaska",
    "Alabama",
    "Arkansas",
    "Arizona",
    "California",
    "Colorado",
    "Connecticut",
    "District of Columbia",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Iowa",
    "Idaho",
    "Illinois",
    "Indiana",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Massachusetts",
    "Maryland",
    "Maine",
    "Michigan",
    "Minnesota",
    "Missouri",
    "Mississippi",
    "Montana",
    "North Carolina",
    "North Dakota",
    "Nebraska",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "Nevada",
    "New York",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Virginia",
    "Vermont",
    "Washington",
    "Wisconsin",
    "West Virginia",
    "Wyoming"
];

export default ToolUI;