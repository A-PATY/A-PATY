package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.CommunityJoinRequestDto;
import com.ssafy.aptCom.db.entity.Apartment;
import com.ssafy.aptCom.db.entity.User;
import com.ssafy.aptCom.db.repository.ApartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service("apartmentService")
@Slf4j
@RequiredArgsConstructor
public class ApartmentServiceImpl implements ApartmentService {

    private final ApartmentRepository apartmentRepository;

    final S3Uploader s3Uploader;

    @Override
    public List<Apartment> getApartmentList(User user) {

        return apartmentRepository.findAllByBaseAddress(user.getBaseAddress());
    }

    @Override
    public void saveNoticeImage(CommunityJoinRequestDto communityJoinRequestDto, String kakaoUserNumber) throws IOException {

        MultipartFile multipartFile = communityJoinRequestDto.getImage();

        if (multipartFile.isEmpty()) {
            log.info("고지서 이미지가 없습니다.");
            throw new IOException();
        }

        log.info("originalFilename={}", multipartFile.getOriginalFilename());

        String originalFilename = multipartFile.getOriginalFilename();
        String storeFilename =
                kakaoUserNumber
                + "_" + communityJoinRequestDto.getAptId()
                + "_" + communityJoinRequestDto.getAptName()
                + "_" + communityJoinRequestDto.getDong()
                + "_" + communityJoinRequestDto.getHo();

        String imageUrl = s3Uploader.upload(multipartFile, "noticeImages", storeFilename);
        log.info("imageUrl={}", imageUrl);

    }

}
