require('./sass/normalize.scss');
require('./sass/mainStyles.scss');

var React = require('react');
var ReactDOM = require('react-dom');

class GaugeList extends React.Component {
  constructor(){
    super();
    this.data = [
      {
        key: 1,
        name: 'Manhattan',
        color: '#3DFFB3',
        healthyPercentage: 91.2
      },
      {
        key: 2,
        name: 'Queens',
        color: '#3D6DFF',
        healthyPercentage: 89.9
      },
      {
        key: 3,
        name: 'Brooklyn',
        color: '#FF403D',
        healthyPercentage: 92.2
      },
      {
        key: 4,
        name: 'Bronx',
        color: '#D9FF3D',
        healthyPercentage: 91.0
      },
      {
        key: 5,
        name: 'Staten Island',
        color: '#3DF2FF',
        healthyPercentage: 89.5
      }
    ];
  }

  render(){
    return(
      <ul className="gaugeList">
        {this.data.map(function(boroughData){
          return(
              <Gauge data={boroughData} />
          )
        })}
      </ul>
    );
  }
}

class Gauge extends React.Component {
  
  render(){
    return(
      <li className="gauge">
        <svg class="gauge" width="140" height="140" viewbox="0 0 140 140">
          <circle className="gauge--outer" r="50" cx="75" cy="75"></circle>
          <circle className="gauge--inner" r="50" cx="75" cy="75" stroke={this.props.data.color}></circle>
        </svg>
        <p className="gauge-number">{this.props.data.healthyPercentage}%</p>
        <p>{this.props.data.name}</p>

      </li>
    )
  }
}

ReactDOM.render(<GaugeList />, document.getElementById('gaugeList'));

window.treeData = require('./treeData');