INSERT INTO COMMUNITY(id, community_type, community_type2, community_code) VALUES(1, '지역', '익명', '123123');

INSERT INTO CATEGORY(id, category_name, admin_only) VALUES(1, '잡담', true);
INSERT INTO CATEGORY(id, category_name, admin_only) VALUES(2, '공지', true);
INSERT INTO CATEGORY(id, category_name, admin_only) VALUES(3, '나눔', false);

INSERT INTO APARTMENT(id, apt_code, apt_name) VALUES(1, '1', '장미아파트');

INSERT INTO USER(id, nickname) VALUES(1, '장미');

INSERT INTO BASE_ADDRESS(id, address, dong_name, gugun_name, ri_name, sido_name) VALUES(1, '111', '장미동', '장미구', '짱미리', '장미시');

INSERT INTO PROFILE_IMG(id, profile_img_url) VALUES(1, 'https://www.naver.com');
