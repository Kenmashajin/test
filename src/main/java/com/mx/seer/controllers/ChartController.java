package com.mx.seer.controllers;


import com.mx.seer.models.Chart;
import com.mx.seer.models.PagosInternacionales;
 
public class ChartController{
	Chart chart;
	public ChartController(String chartName){
		if(chartName.equalsIgnoreCase("internacionales")){
			System.out.println("Pagos Internacionales");
			PagosInternacionales pagosInternacionales=new PagosInternacionales(chartName,"");
			pagosInternacionales.setOptions(pagosInternacionales.obtenerChartOptions());
			setChart(pagosInternacionales);
		}
	}
	public Chart getChart() {
		return chart;
	}
	public void setChart(Chart chart) {
		this.chart = chart;
	}
	
	
}
