package com.mx.seer.hello;

public class MensajeProcesado {
	/*Spring usará automaticamente Jackson JSON library para convertir todas las instancias de 
	 *MensajeProcesado a JSON*/
	 private String content;

	    public MensajeProcesado(String content) {
	        this.content = content;
	    }

	    public String getContent() {
	        return content;
	    }
}
