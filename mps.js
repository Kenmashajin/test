$(function(){
	var map=new jvm.Map({
		container:$('#america-map'),
		map: 'americaPLD',
		focusOn: {
       		x: 1,
      		y: 1,
       		scale: 1.5
     	},
     	zoomOnScroll:false,
     	regionLabelStyle:{
  			initial: {
    			'font-family': 'Verdana',
    			'font-size': '10',
    			'font-weight': 'bold',
    			cursor: 'default',
    			fill: 'black'
  			},
  			hover: {
    			cursor: 'pointer'
 		 	}
		},
		panOnDrag:false,
		onRegionOver:function(e,code){
			$("span#codeName").empty();
			$("span#codeName").append(code);
		},
		regionStyle:{
  			initial: {
    			fill: 'white',"fill-opacity": 1,
    			stroke: 'none',"stroke-width": 0,"stroke-opacity": 1
  			},
  			hover: {
    			"fill-opacity": 0.8,
    			cursor: 'pointer'
  			},
  			selected: {
    			fill: 'white',"fill-opacity": 1,
    			stroke: '#00b0ff',"stroke-width": 1,"stroke-opacity": 1,
  			},
  			selectedHover: {
  			}
		},
		labels: {
      		regions: {
        		render: function(code){
          			//var doNotShow = ['BS', 'HT', 'FK', 'TT'];

          			//if (doNotShow.indexOf(code) === -1) {
            			return code;
          			//}
       			 }
       		}
       	}
	});
	console.info(map);
	var i=0;
	var regions=['US','JM','BR','BS','BZ','GT','GY','HT','HN','PR','PY','PA','PE','EC','MX','FJ','FK','NI','CO','CL','CR','CU','SR','BO','SV','DO','UY','TT','VE','AR'];
	map.setSelectedRegions(['MX']);
	setInterval(function(){
		map.clearSelectedRegions();
		if(i<regions.length){
			map.setSelectedRegions(regions[i]);
			$("span#codeName").empty();
			$("span#codeName").append(map.getRegionName(regions[i]));
		}else{
			i=0;
			$("span#codeName").append(map.getRegionName(regions[i]));
		}
		i++;
	}, 3000);
});