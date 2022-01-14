from flask import Flask, send_file, make_response, request
import matplotlib
import matplotlib.dates as mdates
import matplotlib.pyplot as plt
import json
matplotlib.use('Agg')
import seaborn as sns
import pandas as pd
import random
from datetime import datetime
from flask_cors import CORS

T_FORMAT = "%Y-%m-%d"

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['POST'])
def create_timeplot():
    post = request.get_json()
    df = pd.read_csv('./final_df.csv', ',')

    # states: list of states which will be subset and displayed seperately by color
    states = post['states']
    if len(states) == 0:
        return json.dumps({
            'data' : [['date'], *df.loc[:,'date'].tolist()]
        })
    # Start and end date range
    st = post['start_d'].split("T")[0]
    et = post['end_d'].split("T")[0]

    # metric: metric to display over time
    metric = post['metric']

    # Subset out states
    df = df.loc[df["State"].isin(set(states))]

    # Briefly convert dates into datetime Obj to subset date range
    df.loc[:,'date'] = pd.to_datetime(df['date'])
    df = df[df['date'].between(datetime.strptime(st, T_FORMAT), datetime.strptime(et, T_FORMAT))]
    df.loc[:,'date'] = df['date'].dt.strftime('%Y-%m-%d')

    # Filter out df to only the date and metric chosen
    df = df.loc[:, ['date', 'State', metric]]

    # Build dataframe using dates as an index
    out = pd.DataFrame(df.loc[:, 'date']).set_index('date', inplace=True)    
    for state in states:
        # New dataframe with state only
        state_df = df.groupby('State').get_group(state).set_index('date')
        state_df.rename({metric:state}, axis=1, inplace=True)

        # Join metric of state to out, using state name as label
        out = pd.concat([out, state_df.loc[:, state]], axis=1)

    out.reset_index(level =['date'], inplace = True)

    return json.dumps({
        'data' : [['date', *states], *out.values.tolist()]
    })
