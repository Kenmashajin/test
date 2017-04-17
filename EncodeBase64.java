package com.mx.bancoazteca.encrypt;

import org.apache.commons.codec.binary.Base64;

public class EncodeBase64 {
	public static void main(String args []){
		byte[] encodedBytes = Base64.encodeBase64("|14/12/2016 18:01:08|operador0125|ABCD1234567F8|fisica|".getBytes());
		//byte[] encodedBytes = Base64.encodeBase64("Test".getBytes());
		System.out.println("encodedBytes " + new String(encodedBytes));
		byte[] decodedBytes = Base64.decodeBase64(encodedBytes);
		System.out.println("decodedBytes " + new String(decodedBytes));	
	}
}
