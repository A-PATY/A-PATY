package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.BillApprovalRequestDto;
import com.ssafy.aptCom.api.dto.request.BillRejectionRequestDto;
import com.ssafy.aptCom.api.dto.request.CommunityJoinRequestDto;
import com.ssafy.aptCom.db.entity.Apartment;
import com.ssafy.aptCom.db.entity.Bill;
import com.ssafy.aptCom.db.entity.User;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.List;

public interface ApartmentService {

    List<Apartment> getApartmentList(User user);

    void saveNoticeImage(CommunityJoinRequestDto communityJoinRequestDto, String kakaoUserNumber, User user) throws IOException;

    List<Bill> getBillList();

    void deleteBill(String billImg);

    void deleteBillImage(String oiu);

    void billApproval(BillApprovalRequestDto billApprovalRequestDto, User user) throws UnsupportedEncodingException;

    void billRejection(BillRejectionRequestDto billRejectionRequestDto, User user) throws UnsupportedEncodingException;
    
}
