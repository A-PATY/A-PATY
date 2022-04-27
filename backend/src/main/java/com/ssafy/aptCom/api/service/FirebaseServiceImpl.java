package com.ssafy.aptCom.api.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
public class FirebaseServiceImpl implements FirebaseService {
    public static final String COLLECTION_NAME = "families";

    @Override
    public Boolean insertFamilyMember(String familyId, String userId) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();

        Map<String, Object> userInfo = new HashMap<>();
        Map<String, Integer> userInfoDeep = new HashMap<>();
        userInfoDeep.put("lng", 0);
        userInfoDeep.put("lat", 0);
        userInfo.put(userId, userInfoDeep);

        // family id 가 없으면 새로 family 생성 및 멤버 추가, 있으면 멤버 추가
        try {

            if (getFamilyDetail(familyId) == null) {

                firestore.collection(COLLECTION_NAME).document(familyId)
                        .set(userInfo);

            } else {
                firestore.collection(COLLECTION_NAME).document(familyId)
                        .update(userInfo);
            }

            return true;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }

    @Override
    public Map<String, Object> getFamilyDetail(String familyId) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document(familyId);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        DocumentSnapshot documentSnapshot = apiFuture.get();

        if (documentSnapshot.exists()) {
            log.info("data info : {}",documentSnapshot.getData());
            log.info("data size : {}", documentSnapshot.getData().size());
            return documentSnapshot.getData();

        } else {
            return null;
        }
    }


    @Override
    public Boolean deleteFamilyMember(String familyId, String userId) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();

        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document(familyId);


        // map의 크기가 1 초과면 멤버만 삭제, 1이면 마지막 멤버이므로 family를 삭제
        int size = getFamilyDetail(familyId).size();
        if (size > 1) {
            Map<String, Object> updates = new HashMap<>();
            updates.put(userId, FieldValue.delete());
            documentReference.update(updates);
        } else {
            documentReference.delete();
        }
        return true;
    }
}
