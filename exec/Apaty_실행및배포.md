# 소스코드 빌드 및 배포

<br>

### 1. 프로젝트 환경

```bash
# OS
Ubuntu : 20.04 LTS

# Client
react : 17.0.2
IDE : Visual Studio Code 1.66

# Server
java : 11-amazon-corretto-jdk_11.0.13
spring boot : 2.4.2
IDE : IntelliJ IDEA 2021.3.1
```

```bash
# 웹서버
NGiNX : 1.18.0

server {

  listen 80;
  listen [::]:80;

  root /var/lib/jenkins/workspace/frontend/frontend/build/;
  index index.html;

  server_name apaty.co.kr www.apaty.co.kr;

  location / {
    return 301 https://$host;
  }

  if ($host = k6a101.p.ssafy.io) {
    return 301 https://apaty.co.kr;
  }

  client_max_body_size 10M;

}


server {

  location / {
    root /var/lib/jenkins/workspace/frontend/frontend/build/;
    index index.html;

    try_files  $uri $uri/ /index.html;

    proxy_set_header  Host $http_host;
    proxy_set_header  X-Real-IP $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header  X-Forwarded-Proto $scheme;
    proxy_set_header  X-NginX-Proxy true;

    proxy_buffer_size          128k;
    proxy_buffers              4 256k;
    proxy_busy_buffers_size    256k;
    proxy_connect_timeout 300s;
    proxy_read_timeout 600s;
    proxy_send_timeout 600s;

    charset utf-8;
  }

  location /api {

    proxy_set_header  Host $http_host;
    proxy_set_header  X-Real-IP $remote_addr;
    proxy_set_header  X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header  X-Forwarded-Proto $scheme;
    proxy_set_header  X-NginX-Proxy true;

    proxy_buffer_size          128k;
    proxy_buffers              4 256k;
    proxy_busy_buffers_size    256k;
    proxy_connect_timeout 300s;
    proxy_read_timeout 600s;
    proxy_send_timeout 600s;

    charset utf-8;

    proxy_pass http://k6a101.p.ssafy.io:8080;

  }

  server_name apaty.co.kr www.apaty.co.kr;

  client_max_body_size 10M;

  listen [::]:443 ssl;
  listen 443 ssl;

  ssl_certificate "/etc/letsencrypt/live/apaty.co.kr/fullchain.pem";
  ssl_certificate_key "/etc/letsencrypt/live/apaty.co.kr/privkey.pem";

  ssl_session_cache shared:SSL:1m;
  ssl_session_timeout  10m;
  ssl_ciphers HIGH:!aNULL:!MD5;
  ssl_prefer_server_ciphers on;
  
  if ($host = k6a101.p.ssafy.io) {
    return 301 https://apaty.co.kr;
  }
  
}
```

```bash
# Database
MariaDB : 10.3.34

# DB 접속 정보
user : apaty
password : apaty101!
database : apaty
```

<br>

### 2. Client 실행

1. **원격 저장소 복제**

```shell
$ git clone https://lab.ssafy.com/s06-final/S06P31A101.git
```

2. **프로젝트 폴더로 이동**

```shell
$ cd frontend
```

3. **node_modules 설치**

```shell
$ yarn install
```

4. **클라이언트 서버 실행**

```shell
$ yarn start
```

<br>

### 3. Server 실행

1. **원격 저장소 복제**

```shell
$ git clone https://lab.ssafy.com/s06-final/S06P31A101.git
```

2. **프로젝트 폴더로 이동**

```shell
$ cd backend/src/main/resources/
```

3. **application.yml 파일 생성**
   - 처음 실행한 뒤 `jpa.hibernate.ddl-auto: create` 옵션을 `jpa.hibernate.ddl-auto: none` 으로 바꾼다.

```yaml
server:
  port: [서버 포트]

spring:
  servlet:
    multipart:
      file-size-threshold: 1MB
      location: ./
      max-file-size: 10MB
      max-request-size: 100MB
    firebase: [datastore 관리자 키]
  profiles:
    include: aws
    
  datasource:
    url: jdbc:mariadb://[도메인]:[port]/apaty?serverTimezone=Asia/Seoul&characterEncoding=UTF-8
    driver-class-name: org.mariadb.jdbc.Driver
    username: [DB 사용자명]
    password: [DB PASSWORD]
  jpa:
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    open-in-view: false
    generate-ddl: false
    show-sql: true
    hibernate:
      ddl-auto: create
    properties:
      hibernate:
        jdbc:
          batch_size: 100
          order_inserts: true
          order_updates: true
        
jwt:
  secret: [토큰 비밀키]

kakao:
  api: [Kakao API 키]
```

4. **프로젝트 빌드**

```shell
$ ./gradlew build
```

5. **빌드 폴더 이동 후 jar 파일 실행**

```shell
$ cd backend
$ cd spring/build/libs
$ java -jar [파일명].jar
```