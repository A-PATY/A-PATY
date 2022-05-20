package com.ssafy.aptCom.api.controller;

import com.ssafy.aptCom.api.service.FirebaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class FirebaseController {

    @Autowired
    FirebaseService firebaseService;

//    @PostMapping("/insertFamilyMember")
//    public Boolean insertFamilyMember(@RequestParam String familyId, String userId) throws Exception {
//        return firebaseService.insertFamilyMember(familyId, userId);
//    }

    @GetMapping("/getFamilyDetail")
    public Map<String, Object> getFamilyDetail(@RequestParam String familyId) throws  Exception {
        return firebaseService.getFamilyDetail(familyId);
    }

    @DeleteMapping("/deleteFamilyMember")
    public Boolean deleteFamilyMember(@RequestParam String familyId, String userId) throws  Exception {
        return firebaseService.deleteFamilyMember(familyId, userId);
    }
}
