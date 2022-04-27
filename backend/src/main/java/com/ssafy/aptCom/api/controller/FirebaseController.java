package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.service.FirebaseService;
import com.ssafy.aptCom.api.service.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FirebaseController {

    @Autowired
    FirebaseService firebaseService;

    @GetMapping("/insertMember")
    public String insetMember(@RequestParam Member member) throws Exception {
        return firebaseService.insertMember(member);
    }

    @GetMapping("/getMemberDetail")
    public Member getMemberDetail(@RequestParam String id) throws  Exception {
        System.out.println("----");
        return firebaseService.getMemberDetail(id);
    }
}
