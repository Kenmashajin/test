package com.mx.seer.models;

import org.apache.log4j.Logger;

public class Chart {
	public static org.apache.log4j.Logger log = Logger.getLogger(Chart.class);
	private String chartName;
	private String options;

	protected Chart (String chartName,String options){
		this.chartName=chartName;
		this.options=options;
	}
	public void setChartName(String chartName) {
		this.chartName = chartName;
	}
	
	public void setOptions(String options) {
		this.options = options;
	}
	public String getChartName() {
		return chartName;
	}

	public String getOptions() {
		return options;
	}
	
	
}
