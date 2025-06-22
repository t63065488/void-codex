/* (C)2025 */
package com.voidcodex.sessionmanagement.controller;

import com.voidcodex.sessionmanagement.message.TokenUpdateMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TokenController {

    @MessageMapping("/token")
    @SendTo("/topic/token/update")
    public TokenUpdateMessage sendTokenUpdate(TokenUpdateMessage tokenUpdateMessage) {
        return tokenUpdateMessage;
    }
}
