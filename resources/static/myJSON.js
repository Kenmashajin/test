{
      "chart": {
        "type":"bar"
      },
      "legend":{
        "enabled":true,
        "useHTML":true
      },
	    "title": {
        "useHTML":true,
        "text":"<span class='chart-title'>Tipo de Cambio</span>"
      },
      "subtitle": {
					"useHTML":true,
					"text": "<span class='chart-subtitle'>Julio 2016</span>"
				},
				"xAxis": [{
					"categories":[1,4,5,6,7,8,11,12,13,14,15,18,19,20,21,22,25,26,27,28,29],
					"reversed": false,
					"labels": {
						"step": 1,
						"useHTML":true
					}
				}, {
					"opposite": true,
					"reversed": false,
					"categories": [1,4,5,6,7,8,11,12,13,14,15,18,19,20,21,22,25,26,27,28,29],
					"linkedTo": 0,
					"labels": {
						"step": 1,
						"useHTML":true
					}
				}],
				"yAxis": {
					"title": {
						"text": null
					},
					"tickInterval":5,
					"labels": {
						"useHTML":true
			    },
					"stackLabels":{
						"enabled":true,
						"useHTML":true,
						"gridLineWidth":0,
						"style": {
							"textShadow":"1px 1px 1px #000",
							"color":"#FFF"
						}
					}
				},
        "series": [{
        "name": "Tesoreria",
        "data": [-40.85, -18.80, -18.79, -18.53, -18.76, -18.99, -19.20,
               -19.01, -19.20, -18.95, -19.62, -19.65, -19.21, -18.69,
               -18.80, -18.93, -17.90, -18.99, -18.90, -18.51, -19.62],
              "color":"#6AD0EC"
      }, {
        "name": "Control",
        "data": [40.62, 18.80, 18.79, 18.53, 18.76, 18.99, 19.20,
               18.72, 19.20, 18.95, 19.62, 19.65, 19.21, 18.69,
               19.80, 18.93, 17.90, 18.99, 18.90, 19.07, 19.62],
               "color":"#6AD0EC"
      }]
    }
