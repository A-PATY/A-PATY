package com.ssafy.aptCom.api.service;

import java.util.Map;
import java.util.Optional;

public interface FirebaseService {
    Boolean insertFamilyMember(String familyId, String userId, String doroJuso) throws Exception;
    Map<String, Object> getFamilyDetail(String familyId) throws Exception;
    Boolean deleteFamilyMember(String familyId, String userId) throws Exception;
}
