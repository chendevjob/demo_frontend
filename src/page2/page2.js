import React, {Component} from 'react';
import axios from 'axios';

const ReactHighcharts = require('react-highcharts');


class Page2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'chartConfig': {}
        }
    }

    fetchData() {
        let that = this;
        axios.get('/api/problem1/save_array').then((res) => {
            if (res.status === 200 && res.data.status === 'SUCCESS') {
                let arrays = res.data.data.arrays;
                that.setChartConfig(arrays);
            }
        })
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        // 清除定时器
        if (this.timer) {
            window.clearInterval(this.timer);
        }
    }

    setChartConfig(arrays) {
        let chartConfig = {
            title: {
                text: 'demo 最近保存的数据'
            },
            yAxis: {
                title: {
                    text: '数据'
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },
            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                    pointStart: 2010
                }
            },
            series: arrays.map((item, index) => ({
                name: item.save_time,
                data: item.array,
                visible: index < 10
            })),
            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            },
            credits: false
        };
        this.setState({chartConfig})
    }

    render() {
        return (
            <div className="page2-box">
                <div className='recent-container' id='recent-chart'>
                    <ReactHighcharts config={this.state.chartConfig} domProps={{id: 'recent-chart'}}></ReactHighcharts>
                </div>
            </div>
        );
    }
}

export default Page2;
