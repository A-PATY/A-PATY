package com.ssafy.aptCom.api.service;

import java.util.Map;
import java.util.Optional;

public interface FirebaseService {
    public Boolean insertFamilyMember(String familyId, String userId) throws Exception;
    public Map<String, Object> getFamilyDetail(String familyId) throws Exception;
    public Boolean deleteFamilyMember(String familyId, String userId) throws Exception;
}
