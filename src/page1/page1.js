import React, {Component} from 'react';
import axios from 'axios';
import './page1.css';

const ReactHighcharts = require('react-highcharts');


class Page1 extends Component {
    constructor(props) {
        super(props);
        this.fetchData();
        this.state = {
            'chartConfig': {},
            'array': []
        };
    }

    componentDidMount() {
        this.timer = window.setInterval(this.fetchData.bind(this), 10000);
    }

    componentWillUnmount() {
        // 清除定时器
        if (this.timer) {
            window.clearInterval(this.timer);
        }
    }

    fetchData() {
        let that = this;
        axios.get('/api/problem1/latest_array').then((res) => {
            if (res.status === 200 && res.data.status === 'SUCCESS') {
                let array = res.data.data.array;
                that.setChartConfig(array);
            }
        })
    }

    setChartConfig(array) {
        let chartConfig = {
            title: {
                text: 'demo 自动刷新随机数据'
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
            series: [{
                name: '数据',
                data: array
            }],
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
        this.setState({chartConfig, array})
    }

    saveCurrentData() {
        let that = this;
        axios.post('/api/problem1/save_array', {'array': that.state.array}).then((res) => {
            if(res.status === 200 && res.data.status == 'SUCCESS') {
                alert("保存成功");
            }
        })
    }

    render() {
        return (
            <div className="page1-box">
                <div className='latest-container' id='latest-chart'>
                    <ReactHighcharts config={this.state.chartConfig} domProps={{id: 'latest-chart'}}></ReactHighcharts>
                </div>
                <div className='btn-group'>
                    <button onClick={this.saveCurrentData.bind(this)} className="save-btn">保存当前数据</button>
                </div>
            </div>
        );
    }
}

export default Page1;
