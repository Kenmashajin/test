package com.mx.bancoazteca.encrypt;

import java.security.GeneralSecurityException;
import java.security.NoSuchAlgorithmException;
import java.security.NoSuchProviderException;
import java.security.PrivateKey;
import java.security.Signature;

//Encode Base 64 
import org.apache.commons.codec.binary.Base64;

public class RSA_SHA1Signature {
	public static void main(String args[]){
		GenerateKeys gk;
		String cadena="|14/12/2016 18:01:08|operador0125|ABCD1234567F8|fisica|";
		try {
			gk = new GenerateKeys(1024);
			gk.createKeys();
			try {
				byte [] firma=sign(gk.getPrivateKey(),cadena);
				System.out.println(firma);
				
				//Encode to Base64
				byte[] encodedBytes = Base64.encodeBase64(firma);
				System.out.println("encodedBytes " + new String(encodedBytes));
				
				/*byte[] decodedBytes = Base64.decodeBase64(encodedBytes);
				System.out.println("decodedBytes " + new String(decodedBytes));*/	
			} catch (GeneralSecurityException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		} catch (NoSuchAlgorithmException e) {
			e.printStackTrace();
		} catch (NoSuchProviderException e) {
			e.printStackTrace();
		}
	}
	
	private static byte[] sign(PrivateKey key, String data)throws GeneralSecurityException {

		Signature signature = Signature.getInstance("SHA1withRSA");
		signature.initSign(key);
		signature.update(data.getBytes());
		return signature.sign();
	}
}
