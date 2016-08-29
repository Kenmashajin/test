"use strict";

/*Component ReactJS visualization with JSX*/
var Chart	= React.createClass({
    // When the DOM is ready, create the chart.
    componentDidMount: function() {

      // Set container which the chart should render to.
      this.chart = new Highcharts[this.props.type || "Chart"](
        this.props.container,
        this.props.options
      );
    },
    //Destroy chart before unmount.
    componentWillUnmount: function() {
      this.chart.destroy();
    },
    //Create the div which the chart will be rendered to.
    render: function() {
      return React.createElement('div', {
        id: this.props.container
      });
    }
  }),
  element;

// Create and render element
element = React.createElement(Chart, {
	  container: 'chart',
	  options: {
	    chart: {
	      type: 'funnel',
	      marginRight: 100
	    },
	    title: {
	      text: 'React example',
	      x: -50
	    },
	    plotOptions: {
	      series: {
	        dataLabels: {
	          enabled: true,
	          format: '<b>{point.name}</b> ({point.y:,.0f})',
	          color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
	          softConnector: true
	        },
	        neckWidth: '30%',
	        neckHeight: '25%'
	      }
	    },
	    legend: {
	      enabled: false
	    },
	    series: [{
	      name: 'Unique users',
	      data: [
	        ['Website visits', 15654],
	        ['Downloads', 4064],
	        ['Requested price list', 1987],
	        ['Invoice sent', 976],
	        ['Finalized', 846]
	      ]
	    }]
	  }
	});

/*Angular module*/
var app	= angular.module( 'app', ['react'] );

/*Define AngularJS Controller*/
app.controller( 'user_ctrl',['$scope', function ($scope) {
	ReactDOM.render(element, document.getElementById('react-app'));
}]);
