package com.ssafy.aptCom.api.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class FirebaseServiceImpl implements FirebaseService {
    public static final String COLLECTION_NAME = "member";

    @Override
    public String insertMember(Member member) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> apiFuture = firestore.collection(COLLECTION_NAME).document(member.getId().toString())
                .set(member);
        return apiFuture.get().getUpdateTime().toString();
    }

    @Override
    public Member getMemberDetail(String id) throws Exception {
        Firestore firestore = FirestoreClient.getFirestore();
        log.info("firestore : {}", firestore);
        DocumentReference documentReference = firestore.collection(COLLECTION_NAME).document(id);
        log.info("ref : {}", documentReference);
        ApiFuture<DocumentSnapshot> apiFuture = documentReference.get();
        log.info("api : {}", apiFuture);
        DocumentSnapshot documentSnapshot = apiFuture.get();
        log.info("snapshot : {}", documentSnapshot);
        Member member = null;

        if (documentSnapshot.exists()) {
            member = documentSnapshot.toObject(Member.class);
            return member;
        } else {
            return null;
        }
    }
}
