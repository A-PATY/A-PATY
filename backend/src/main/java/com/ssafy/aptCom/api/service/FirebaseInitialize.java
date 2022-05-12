package com.ssafy.aptCom.api.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.io.FileUtils;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

@Slf4j
@Component
public class FirebaseInitialize {

    private String infoDir = "testfirestore-1916a-firebase-adminsdk-8wyli-6a8205ed25.json";

//    private final FirebaseApp firebaseApp = null;

    @PostConstruct
    public void initialize() {
        log.info("firebase initialize");
        try {
            final ClassPathResource resource = new ClassPathResource(infoDir);

            InputStream inputStream = resource.getInputStream();
            File somethingFile = File.createTempFile("testfirestore-1916a-firebase-adminsdk-8wyli-6a8205ed25", ".json");
            FileUtils.copyInputStreamToFile(inputStream, somethingFile);

            final FileInputStream serviceAccount = new FileInputStream(somethingFile);

            final FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                    .setDatabaseUrl("https://testfirestore-1916a.asia-northeast3.firebaseio.com")
                    .build();

//            firebaseApp.initializeApp(options);
            FirebaseApp.initializeApp(options);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
