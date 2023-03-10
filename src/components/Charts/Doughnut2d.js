import React from 'react';
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.candy';


ReactFC.fcRoot(FusionCharts, Charts, FusionTheme);


const ChartComponent = ({data}) => {
    const chartConfigs = {
        type: 'doughnut2d',
        width: '100%',
        height: 400,
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Stars Per Language",
                "theme": "candy",
                "decimals": 0,
                "doughnutRadius": '45%',
                "showPercentValues": 0,
                "updateAnimDuration": "0.4"
            },
            data
        },
    };
    return <ReactFC {...chartConfigs} />;
}


export default ChartComponent;

