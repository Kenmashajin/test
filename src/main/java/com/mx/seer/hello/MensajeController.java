package com.mx.seer.hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import com.mx.seer.controllers.ChartController;
import com.mx.seer.models.HandlerRequests;


@Controller
public class MensajeController {
	@Autowired private SimpMessagingTemplate simpMessagingTemplate;  
	
    @MessageMapping("/hello/{user}")
    //@SendTo("/topic/greetings")
    public void greeting(@DestinationVariable String user,Mensaje mensaje) throws Exception {
        Thread.sleep(5000); // simulated delay
        System.out.println("userId: "+user);
        simpMessagingTemplate.convertAndSend("/topic/greetings/"+user, new MensajeProcesado("Hola, " + mensaje.getMensaje() + "!")); 
    }
    
    @MessageMapping("/chart/options/{channelUser}")
    //@SendTo("/topic/greetings")
    public void getChartOptions(@DestinationVariable String channelUser,HandlerRequests handler) throws Exception {
        Thread.sleep(5000); // simulated delay
        System.out.println("chart Name: "+channelUser);
        simpMessagingTemplate.convertAndSend("/topic/chart/"+channelUser, new ChartController(handler.getChartName())); 
    }
}