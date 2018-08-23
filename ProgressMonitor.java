package com.mx.sofome.monitoring;

import com.jcraft.jsch.SftpProgressMonitor;

public class ProgressMonitor implements SftpProgressMonitor{
	private long max                = 0;
	private long count              = 0;
	private long percent            = 0;

	// If you need send something to the constructor, change this method
	public ProgressMonitor() {}

	public void init(int op, java.lang.String src, java.lang.String dest, long max) {
		this.max = max;
		System.out.println("*******Starting*******");
		System.out.println(src); // Origin destination
		System.out.println(dest); // Destination path
		System.out.println(max); // Total filesize
	}

	public boolean count(long bytes){
		this.count += bytes;
		long percentNow = this.count*100/max;
		if(percentNow>this.percent){
			this.percent = percentNow;

			System.out.println("Progress: "+this.percent+"%"); // Progress 0,0
			System.out.println("Total File size: "+max); //Total filesize
			System.out.println("Progress in bytes: "+this.count); // Progress in bytes from the total
		}

		return(true);
	}

	public void end(){
		System.out.println("*******Finished*******");// The process is over
		System.out.println(this.percent+"%"); // Progress
		System.out.println(max+" Total file size"); // Total filesize
		System.out.println(this.count+" bytes download"); // Process in bytes from the total
	}
}
