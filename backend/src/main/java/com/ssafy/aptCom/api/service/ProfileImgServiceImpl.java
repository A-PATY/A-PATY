package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.db.entity.ProfileImg;
import com.ssafy.aptCom.db.repository.ProfileImgRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("profileImgService")
@Slf4j
@RequiredArgsConstructor
public class ProfileImgServiceImpl implements ProfileImgService {

    private final ProfileImgRepository profileImgRepository;

    @Override
    public List<ProfileImg> getProfileImgList() {
        return profileImgRepository.findAll();
    }

}
