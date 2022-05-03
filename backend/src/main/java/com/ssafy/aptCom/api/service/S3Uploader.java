package com.ssafy.aptCom.api.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;

@Slf4j
@Service
@Component
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${spring.servlet.multipart.location}")
    private String localDir;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public S3Uploader(AmazonS3Client amazonS3Client) {
        this.amazonS3Client = amazonS3Client;
    }


    // Multipart file 을 file 로 변환, 로컬에 이미지 업로드
    public String upload(MultipartFile multipartFile, String S3dirName, String storeFileName) throws IOException {
        File uploadFile = convert(multipartFile, storeFileName)
                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 전환이 실패했습니다."));
        return upload(uploadFile, S3dirName);
    }

    // file 을 S3에 업로드 및 로컬 파일 삭제
    public String upload(File uploadFileLocal, String S3dirName) {
        String fileNameDir = S3dirName + "/" + uploadFileLocal.getName();
        log.info("**********************************");
        log.info("s3용 디렉터리- fileNameDir: {}", fileNameDir);
        log.info("**********************************");
        String uploadImageUrl = putS3(uploadFileLocal, fileNameDir);
        removeNewFile(uploadFileLocal);
        return uploadImageUrl;
    }

    // file 을 삭제
    public String disload(String fileNameDir) {
        return deleteS3(fileNameDir);
    }

    private String putS3(File uploadFile, String fileNameDir) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileNameDir, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));

        return amazonS3Client.getUrl(bucket, fileNameDir).toString();
    }

    private String deleteS3(String fileNameDir) {
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileNameDir));

        return amazonS3Client.getUrl(bucket, fileNameDir).toString();
    }

    // 로컬에 저장된 이미지 삭제
    private void removeNewFile(File targetFile) {
        log.info("파일이 삭제되었습니다.:{}",targetFile);

        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }

    // 로컬에 파일 업로드
    private Optional<File> convert(MultipartFile file, String storeFilename) throws IOException {

        File convertFile = new File((localDir) + "/" + storeFilename);
        log.info(localDir);
        if(convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            }
            return Optional.of(convertFile);
        }

        return Optional.empty();
    }
}
