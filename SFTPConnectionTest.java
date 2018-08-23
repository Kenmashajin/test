package com.mx.sofome.client;
	 
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.SftpException;
import com.mx.sofome.sftp.conector.SFTPConnector;

import java.io.IOException;
	 
	public class SFTPConnectionTest {

	 
		private static final String HOST = "**";
		private static final String USERNAME = "**";
	    private static final int PORT = 22;
	    private static final String PASSWORD = "**";
	 
	    public static void main(String[] args) {
	 
	        try {
	            SFTPConnector sshConnector = new SFTPConnector();
	             
	             
	            sshConnector.connect(USERNAME, PASSWORD, HOST, PORT);
	            //sshConnector.addFile("/home/MyFiles", "C:/MyFiles/archivo.txt","archivo.txt");
	            
	            sshConnector.downloadFile();
	            
	            sshConnector.disconnect();
	            
	        } catch (JSchException ex) {
	            ex.printStackTrace();
	             
	            System.out.println(ex.getMessage());
	        } catch (IllegalAccessException ex) {
	            ex.printStackTrace();
	             
	            System.out.println(ex.getMessage());
	        } /*catch (IOException ex) {
	            ex.printStackTrace();
	             
	            System.out.println(ex.getMessage());
	        } catch (SftpException ex) {
	            ex.printStackTrace();
	             
	            System.out.println(ex.getMessage());
	        }*/
	    }
	}