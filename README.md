
# A:PATY 

### SSAFY 6기 자율 프로젝트 - 지역/아파트 커뮤니티 
  
  
  
### 💁 서비스 소개

- ``A:PATY``  [https://apaty.co.kr](https://apaty.co.kr)

- 파티처럼 즐거운 지역 아파트 커뮤니티
- 하이퍼로컬 (hyperlocal)  주거 지역 기반 생활밀착형 서비스

- YouTube [보러가기](https://www.youtube.com/watch?v=e4ePun0enB4&feature=youtu.be)  ▶
  
  
  
### 💡 주요 기능 (특장점)

- 지역 커뮤니티  -  지역 주민 간 주제별 커뮤니티 형성
- 아파트 커뮤니티 (익명/실명)  -  아파트 이웃 주민과의 자유로운 소통
- 고지서 인증  -  아파트 커뮤니티 가입 실거주 인증
- GPS 기반 우리 가족 위치 찾기  -  아파트 근거리 내, 우리 아이 위치 확인 가능
- 모바일 1st 디자인 
  
  
  
#### :desktop_computer:  시연 영상

|                회원가입 / 로그인 / 마이페이지                |              아파트 커뮤니티 가입 (고지서 인증)              |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![회원관리로그인](https://user-images.githubusercontent.com/12628688/169336165-b3a4d472-add0-4786-955b-5e5edbe45ecc.gif) | ![아파트커뮤니티가입1](https://user-images.githubusercontent.com/12628688/169361589-3c062715-9e99-4150-ab3c-c040964c9cd3.gif) |




|                         관리자 승인                          |                       관리자 공지사항                        |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![관리자고지서승인](https://user-images.githubusercontent.com/12628688/169324761-7b550ca1-a641-4310-9fb2-090e98ad900f.gif) | ![관리자공지사항](https://user-images.githubusercontent.com/12628688/169324816-a40e36ae-d678-428a-a0e6-11d659558efd.gif) |



|                        지역 커뮤니티                         |                       아파트 커뮤니티                        |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![지역커뮤니티](https://user-images.githubusercontent.com/12628688/169355213-8c12f4fc-0741-4850-9d10-015aef0dfe0b.gif) | ![아파트커뮤니티](https://user-images.githubusercontent.com/12628688/169337868-622bba79-d02e-4228-990c-d8685ebecce6.gif) |



|                        GPS 가족 찾기                         |                             알림                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![가족찾기](https://user-images.githubusercontent.com/12628688/169323995-80443b76-eced-491d-b7a5-7c23aafc46ae.gif) | ![알림기능](https://user-images.githubusercontent.com/12628688/169357652-040aca20-6d66-4718-bce0-75064aa75293.gif) |

  
   
  
### 🎈 상세 구현기능

| 기능                      | 상세내용                                                     |
| ------------------------- | ------------------------------------------------------------ |
| 로그인                    | 소셜 로그인 (카카오), 로그아웃                               |
| 회원관리                  | 회원가입, 프로필 이미지 설정, 현재 위치 기반 주소 설정, 회원정보 수정, 탈퇴 |
| 지역 커뮤니티 가입        | 회원가입 시 거주 지역 커뮤니티 자동 가입                     |
| 아파트 커뮤니티 가입      | 고지서 인증 승인 후 가입 (고지서 이미지 전송, 동/호수 설정)  |
| 게시판 전체 기능          | 게시글, 댓글, 비밀댓글, 다중 이미지 첨부, 무한스크롤, 조회수, 좋아요, 키워드 검색 |
| 게시판 구분               | 지역별 커뮤니티, 아파트 커뮤니티 (익명/실명)                 |
| 게시글 주제 카테고리 종류 | 일상, 정보, 나눔장터, 헬프, 육아, 교육, 공구, 후기           |
| 가족 위치 찾기            | GPS 기반 아파트 근거리 내 가족 위치 확인 , 개인별 허용 여부 설정 |
| 관리자 페이지             | 고지서 인증 승인/반려, 공지사항 관리                         |

  
  
  

### 🛠 기술 스택
  
#### Front-end

- HTML5, CSS3, Typescript (4.6.3)
- Node.js (16.14.0)
- React (18.0.0), React-Router (6.3.0), Recoil (0.7.2), React-Query (3.38.1)
- Axios (0.27.2)
- Firebase (9.6.11)
- yarn (1.22.18)
- Emotion (11.9.0), MUI (5.6.2)
- MSW (0.39.2)
  
#### Back-end

- Java 11
- Spring Boot 2.4.2, Spring Data JPA, Spring Security
- MariaDB, Firebase Datastore
- Swagger 3.0.0
- JUnit 5
  
#### Infra

- AWS EC2 - Deplay server
- AWS S3  - Image file server
- NginX
- Docker, Jenkins

  
    
  
### 📂 프로젝트 구성도

#### 아키텍처![아키텍처](https://user-images.githubusercontent.com/12628688/169325492-a69b07d3-824b-46eb-8e9f-85164d22ae5f.JPG)

#### ERD

#### ![erd](https://user-images.githubusercontent.com/12628688/169325785-5d6bc3e3-b72f-4c41-8079-8627813e52c9.JPG)

  
  
### 👪 개발 팀 소개
  
#### 팀원 소개

| 이름   | 역할                | 개발 내용                                                    |
| ------ | ------------------- | ------------------------------------------------------------ |
| 이여진 | 팀장<br />Front-end | - 서비스 메인 홈 페이지 개발<br/>- 회원 관리 서비스 개발<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 카카오 소셜 로그인을 통한 회원 가입 <br/>&nbsp;&nbsp;&nbsp;&nbsp;- JWT Refresh Token을 사용한 로그인 서비스 <br/>&nbsp;&nbsp;&nbsp;&nbsp;- 회원 정보 수정, 로그아웃, 탈퇴 서비스 개발<br/>- 아파트 리스트 조회, 고지서 제출 서비스 개발<br/>- 관리자 고지서 리스트 조회, 승인, 반려 서비스 개발<br/>- 게시글 리스트 조회 시, Skeleton UI 구현<br/>- 'Recoil'을 이용한 상태 관리<br/>- 'Emotion'을 이용한 CSS-in-JS 방식으로 스타일링 구현<br/>- 'Mock Service Worker'를 이용해 목업 API 구현하여 API 테스트 진행 |
| 김선민 | Front-end           | - 가족 위치 찾기 개발<br/>&nbsp;&nbsp;&nbsp;&nbsp;- kakao map API, geolocation API를 이용한 map, 위치 구현<br/>- 위치 정보 알림 및 조회 기능<br/>- 공지 조회, 좋아요 기능<br/>- firebase database, datastore 연동<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 유저 접속 여부<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 가족 위치/범위 정보 update<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 알림 정보 set, update, delete<br/>- 'Recoil'을 이용한 상태 관리<br/>- 'Emotion'을 이용한 CSS-in-JS 방식으로 스타일링 구현<br/>- 'Mock Service Worker'를 이용해 목업 API 구현하여 API 테스트 진행 |
| 채예은 | Front-end           |                                                              |
| 방의진 | Back-end            | - DB 설계<br/>- Spring Boot RESTful API 구현<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 게시글 작성, 수정 및 삭제 (Aws S3 연동)<br/>- Firebase Datastore 연동<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 가족 정보 Create, Insert, Delete<br/>- Junit5, Mock 기반 단위 테스트코드 작성<br/>- Jenkins, Docker 기반 CI/CD 배포 |
| 손영배 | Back-end            | - DB 설계<br/>- Spring Boot RESTful API 구현<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 소셜 로그인, 로그아웃<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 회원관리 (수정/탈퇴)<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 커뮤니티 가입, 고지서 인증<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 관리자 기능<br/>- Jenkins, Docker 기반 CI/CD 배포 |
| 조은솔 | Back-end            | - DB 설계<br/>- Spring Boot RESTful API 구현<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 게시판, 게시글 조회 (무한스크롤, 키워드 검색)<br/>	&nbsp;&nbsp;&nbsp;&nbsp;- 댓글 작성/삭제<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 좋아요, 조회수 처리<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 가족 리스트 조회<br/>- Firebase Datastore 연동<br/>&nbsp;&nbsp;&nbsp;&nbsp;- 가족 정보 Create, Insert, Delete<br/>- 지역, 아파트, 커뮤니티 기초 데이터 가공 및 생성<br/>- Jenkins, Docker 기반 CI/CD 배포 |

  
  
#### 협업 툴

- 문서 정리 : Notion  [바로가기](https://www.notion.so/27bd1dcf1319422481c0f2b3b1562ecb)
- 이슈 관리 : Jira
- 형상 관리 : Gitlab
- 소통 : Mattermost, Gatter town

  ![게더타운](https://user-images.githubusercontent.com/12628688/169325187-430004a5-6c15-4a58-bf64-8315e0fde128.gif)

   
#### 컨벤션 

- 문서 링크   [바로가기](https://www.notion.so/Convention-61d6404cc0d0424296e57cec6def1b87)

  
  
### 📅 개발 기간 및 일정

####   22.4.11 ~ 22.05.20 (6주)
- 세부일정   [바로가기](https://www.notion.so/cbc32e6dd51d4db1aa65e1b4b4e5e110)

  
  
  

### 💻 실행 방법
  
#### Client 실행

```bash
$ git clone https://lab.ssafy.com/s06-final/S06P31A101.git
$ cd frontend
$ yarn install
$ yarn start
```
  
#### Server 실행
  
```bash
$ git clone https://lab.ssafy.com/s06-bigdata-rec-sub2/S06P22A104.git
$ cd backend/src/main/resources
# application.yml 파일 생성 (exec 폴더 참조)

$ ./gradlew build
$ cd backend
$ cd build/libs
$ java -jar [파일명].jar
```
  
