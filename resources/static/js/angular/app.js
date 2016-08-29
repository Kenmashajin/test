'use strict';

//React Component
var Chart = React.createClass({
    getInitialState: function() {
      return {container:this.props.container,
              url:this.props.url,
              options:this.props.options}
    },
    loadOptionsFromServer: function() {
        console.info(this.props.url);
        $.ajax({
          url: this.props.url,
          dataType: 'JSON',
          cache: false,
          success: function(data) {
            //this.setState({options: JSON.parse(JSON.stringify(data))});
            this.setState({options: data});
            this.componentWillUnmount();
            this.componentDidMount();
          }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
    },
    /*componentDidMount is a method called automatically by React after a component is rendered for the first time.
     *it's employed for when the DOM is ready, create the chart.
    */
    componentDidMount: function() {
      // Extend Highcharts with modules
      console.info("Options");
      console.info(this.props.options);
      console.info("Options state");
      console.info(this.state.options);

      if (this.props.modules) {
        this.props.modules.forEach(function(module) {
          module(Highcharts);
        });
      }

      this.interval=setInterval(this.loadOptionsFromServer,10000);

      // Set container which the chart should render to.
      this.chart = new Highcharts[this.props.type || "Chart"](
        this.state.container,
        this.state.options
      );
    },
    //Destroy chart before unmount.
    componentWillUnmount: function() {
      clearInterval(this.interval);
      this.chart.destroy();
    },
    //Create the div which the chart will be rendered to.
    render: function() {
      var container=this.state.container;
      var url=this.state.url;
      var options=this.state.options;

      return React.createElement('div', {
        id: container
      });
    }
  }),
//  element,
//  element2,
  element3;


/* Create and render element SOLO TIENEN PROPIEDADES
* React.createElement(reactComponent, { className: 'my-list' }, child);
*/
/*element = React.createElement(Chart, {
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

        //-- Other available options
        // height: pixels or percent
        // width: pixels or percent
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
});*/

/*element2 = React.createElement(Chart, {
  container: 'stockChart',
  type: 'stockChart',
  options: {
    rangeSelector: {
      selected: 0
    },
    title: {
      text: 'USD to EUR exchange rate'
    },
    tooltip: {
      style: {
        width: '200px'
      },
      valueDecimals: 4,
      shared: true
    },
    yAxis: {
      title: {
        text: 'Exchange rate'
      }
    },
    series: [{
      name: 'USD to EUR',
      data: usdeur,
      id: 'dataseries'
      // the event marker flags
    }, {
      type: 'flags',
      data: [{
        x: Date.UTC(2015, 5, 8),
        title: 'C',
        text: 'Stocks fall on Greece, rate concerns; US dollar dips'
      }, {
        x: Date.UTC(2015, 5, 12),
        title: 'D',
        text: 'Zimbabwe ditches \'worthless\' currency for the US dollar '
      }, {
        x: Date.UTC(2015, 5, 19),
        title: 'E',
        text: 'US Dollar Declines Over the Week on Rate Timeline'
      }, {
        x: Date.UTC(2015, 5, 26),
        title: 'F',
        text: 'Greek Negotiations Take Sharp Turn for Worse, US Dollar set to Rally '
      }, {
        x: Date.UTC(2015, 5, 29),
        title: 'G',
        text: 'Euro records stunning reversal against dollar'
      }, {
        x: Date.UTC(2015, 5, 30),
        title: 'H',
        text: 'Surging US dollar curbs global IT spend'
      }],
      onSeries: 'dataseries',
      shape: 'circlepin',
      width: 16
    }]
  }
});*/

var categories = ['1','4','5','6','7','8','11','12','13','14','15','18','19','20','21','22','25','26','27','28','29'];

element3 = React.createElement(Chart, {
  container: 'tipoCambio',
  url:"myJSON.js",
  options:{
				chart: {
					type: 'bar'
				},
				legend:{
					enabled:true,
					useHTML:true,
					labelFormatter:function(){return '<span class="chart-label-x">'+ this.name+'</span>';}
				},
				title: {
					useHTML:true,
					text: '<span class="chart-title">Tipo de Cambio</span>'
				},
				subtitle: {
					useHTML:true,
					text: '<span class="chart-subtitle">Julio 2016</span>'
				},
				xAxis: [{
					categories: categories,
					reversed: false,
					labels: {
						step: 1,
						useHTML:true,
						formatter: function(){return '<span class="chart-label-x">'+$.number(this.value,0)+'</span>';}
					}
				}, { // mirror axis on right side
					opposite: true,
					reversed: false,
					categories: categories,
					linkedTo: 0,
					labels: {
						step: 1,
						useHTML:true,
						formatter: function(){return '<span class="chart-label-x">'+$.number(this.value,0)+'</span>';}
					}
				}],
				yAxis: {
					title: {
						text: null
					},
					tickInterval:5,
					labels: {
						useHTML:true,
						formatter: function(){return '<span class="chart-label-y">$'+$.number((this.value<0?(this.value*-1):this.value),0)+'</span>';}
	                },
					stackLabels: {
						enabled: true,
						useHTML:true,
						formatter: function(){return '<span class="chart-label-y">$'+$.number((this.total<0?(this.total*-1):this.total),2)+'</span>';},
						gridLineWidth: 0,
						style: {
							textShadow: "1px 1px 1px #000",
							color:"#FFF"
						}
					}
				},
        series: [{
        name: 'Tesoreria',
        data: [-18.85, -18.80, -18.79, -18.53, -18.76, -18.99, -19.20,
               -19.01, -19.20, -18.95, -19.62, -19.65, -19.21, -18.69,
               -18.80, -18.93, -17.90, -18.99, -18.90, -18.51, -19.62],
              color:"#6AD0EC"
      }, {
        name: 'Control',
        data: [18.62, 18.80, 18.79, 18.53, 18.76, 18.99, 19.20,
               18.72, 19.20, 18.95, 19.62, 19.65, 19.21, 18.69,
               19.80, 18.93, 17.90, 18.99, 18.90, 19.07, 19.62],
               color:"#6AD0EC"
      }]
    }
});


//ReactDOM.render(element, document.getElementById('react-app'));
//ReactDOM.render(element2, document.getElementById('react-stock'));



/*Angular module*/
var app	= angular.module( 'app', ['react'] );

/*Define AngularJS Controller*/
app.controller( 'user_ctrl',['$scope', function ($scope) {
	ReactDOM.render(element3, document.getElementById('tipoCambio'));
}]);
