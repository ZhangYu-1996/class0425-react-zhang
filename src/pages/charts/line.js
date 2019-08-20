import React, {Component } from 'react';
import ReactEcharts from 'echarts-for-react';


class Line extends Component{
  getOption = () => {

    const data = [];

    for (let i = 0; i <= 100; i++) {
      const theta = i / 100 * 360;
      const r = 5 * (1 + Math.sin(theta / 180 * Math.PI));
      data.push([r, theta]);
    }
    return {
      title: {
        text: '极坐标双数值轴'
      },
      legend: {
        data: ['line']
      },
      polar: {},
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        }
      },
      angleAxis: {
        type: 'value',
        startAngle: 0
      },
      radiusAxis: {
      },
      series: [{
        coordinateSystem: 'polar',
        name: 'line',
        type: 'line',
        data: data
      }]
    };
  };
  render() {
    return  <div>
      <ReactEcharts option={this.getOption()}/>
    </div>

  }

}
export default Line;