package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.BillApprovalRequestDto;
import com.ssafy.aptCom.api.dto.request.BillRejectionRequestDto;
import com.ssafy.aptCom.api.dto.request.CommunityJoinRequestDto;
import com.ssafy.aptCom.db.entity.*;
import com.ssafy.aptCom.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service("apartmentService")
@Slf4j
@RequiredArgsConstructor
public class ApartmentServiceImpl implements ApartmentService {

    @Autowired
    private ApartmentRepository apartmentRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserCommunityRepository userCommunityRepository;

    @Autowired
    private CommunityRepository communityRepository;

    final S3Uploader s3Uploader;

    @Override
    public List<Apartment> getApartmentList(User user) { return apartmentRepository.findAllByBaseAddress(user.getBaseAddress()); }

    @Transactional
    @Override
    public void saveNoticeImage(CommunityJoinRequestDto communityJoinRequestDto, String kakaoUserNumber, User user) throws IOException {

        MultipartFile multipartFile = communityJoinRequestDto.getImage();

        if (multipartFile.isEmpty()) {
            log.info("고지서 이미지가 없습니다.");
            throw new IOException();
        }

        log.info("originalFilename={}", multipartFile.getOriginalFilename());

        String originalFilename = multipartFile.getOriginalFilename();
        String ext = extractExt(originalFilename);

        String storeFilename =
                kakaoUserNumber
                + "_" + communityJoinRequestDto.getAptId()
                + "_" + communityJoinRequestDto.getAptName()
                + "_" + communityJoinRequestDto.getDong()
                + "_" + communityJoinRequestDto.getHo()
                + "_" + communityJoinRequestDto.getDoroJuso()
                + "." + ext;

        String imageUrl = s3Uploader.upload(multipartFile, "noticeImages", storeFilename);
        log.info("imageUrl={}", imageUrl);

        Bill bill = Bill.builder()
                .billImg(imageUrl)
                .build();

        billRepository.save(bill);

        user.setBillStatus("승인 대기중");
        userRepository.save(user);

    }

    @Override
    public List<Bill> getBillList() { return billRepository.findAll(); }

    @Transactional
    @Override
    public void deleteBill(String billImg) {
        billRepository.deleteByBillImg(billImg);
    }

    @Override
    public void deleteBillImage(String oiu) {
        String fileNameDir = oiu.substring(oiu.indexOf("noticeImages"));
        log.info("fileNameDir {}", fileNameDir);
        s3Uploader.disload(fileNameDir);

    }

    @Transactional
    @Override
    public void billApproval(BillApprovalRequestDto billApprovalRequestDto, User user) {

        String billImg = billApprovalRequestDto.getBillImg();

        // S3 이미지 삭제
        deleteBillImage(billImg);

        // Bill 정보 삭제
        deleteBill(billImg);

        Optional<Apartment> apartment = apartmentRepository.findById(billApprovalRequestDto.getAptId());

        // 유저 정보 저장
        user.setApartment(apartment.get());
        user.setDong(billApprovalRequestDto.getDong());
        user.setHo(billApprovalRequestDto.getHo());
        user.setBillStatus("승인");
        userRepository.save(user);

        // 유저커뮤니티 정보 저장
        String aptCode = apartment.get().getAptCode();
        Community community = communityRepository.findCommunityByCommunityCode(aptCode);

        UserCommunity userCommunity = UserCommunity.builder()
                .user(user)
                .community(community)
                .build();

        userCommunityRepository.save(userCommunity);

    }

    @Transactional
    @Override
    public void billRejection(BillRejectionRequestDto billRejectionRequestDto, User user) {

        String billImg = billRejectionRequestDto.getBillImg();

        deleteBillImage(billImg);

        deleteBill(billImg);

        user.setBillStatus("반려");
        userRepository.save(user);

    }

    public String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }


}
