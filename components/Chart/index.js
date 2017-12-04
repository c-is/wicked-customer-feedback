import React, { PropTypes } from 'react';
import cx from 'classnames';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.piecelabel.js';

import SvgOverview from '../../svg/overview.svg';
import SvgPerson from '../../svg/person.svg';

import s from './Chart.css';

class Chart extends React.Component {

  static propTypes = {
    datasets: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  state = {
    data: this.props.datasets,
  }

  componentWillMount() {
    this.setChartData(this.props.datasets);
  }

  componentWillReceiveProps(nextProps) {
    this.setChartData(nextProps.datasets);
  }

  shouldComponentUpdate(nextProps) {
    const datasets = this.props.datasets.length;
    const nextDatasets = nextProps.datasets.length;

    return datasets !== nextDatasets;
  }

  getChartData = (item) => {
    const dataArray = [];
    const labelArray = [];

    for (let i = item.length - 1; i >= 0; i -= 1) {
      dataArray.push(item[i].rating);
      labelArray.push(item[i].name);
    }

    const chartBaseData = {
      labels: labelArray,
      datasets: [{
        data: dataArray,
      }],
    };

    return chartBaseData;
  }

  setChartData(data) {
    const counts = {};
    const countsVal = [];
    const countsKey = [];
    const colours = ['#a3c7c9', '#36a2eb', '#DBF064', '#FD5E3F', '#ff6384'];

    data.forEach((x) => {
      counts[x.rating] = (counts[x.rating] || 0) + 1;
    });

    for (const key in counts) {
      countsVal.push(counts[key]);
      countsKey.push(`★${key}`);
    }

    const chartPieData = {
      labels: countsKey,
      datasets: [{
        borderWidth: 0,
        borderColor: '#ffffff',
        hoverBorderWidth: 4,
        hoverRadius: 1,
        backgroundColor: colours,
        data: countsVal,
      }],
    };

    this.setState({
      chartData: this.getChartData(data),
      chartData2: chartPieData,
    });
  }

  render() {
    const chartData = this.state.chartData;
    const chartData2 = this.state.chartData2;

    const chartOptions = {
      legend: {
        display: false,
      },
      scales: {
        xAxes: [{
          gridLines: {
            offsetGridLines: false,
          },
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    };

    const chartPieOptions = {
      legend: {
        display: false,
      },
      pieceLabel: {
        render: 'label',
        showActualPercentages: true,
        fontSize: 24,
        fontColor: '#333',
      },
    };

    return (
      <div>
        <div className={s.chartGraph}>
          <h5 className={s.chartTitle}>
            <i
              className={cx(s.icon, s.iconOverview)}
              style={{ backgroundImage: `url(${SvgOverview})` }}
            />
            Feedback overview
          </h5>
          <Pie data={chartData2} options={chartPieOptions} />
        </div>

        <div className={cx(s.chartGraph, s.chartBarGraph)}>
          <h5 className={s.chartTitle}>
            <i
              className={cx(s.icon, s.iconPerson)}
              style={{ backgroundImage: `url(${SvgPerson})` }}
            />
            People who rated this app
          </h5>
          <Bar
            data={chartData}
            options={chartOptions}
            height={window.innerHeight / 8}
          />
        </div>
      </div>
    );
  }
}

export default Chart;
