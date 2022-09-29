Nest project

## Config
- Winston Log
- Custom Repository
- TypeORM Config

## Auth
### auth Module
![image](https://user-images.githubusercontent.com/80230648/192722202-41f24265-8eb0-4dd9-81d6-6762c6b8fdc6.png)

- Type ORM, Type ORM Custom Repository, JWT Passport Module

### auth Controller

- login
  - jwt 인증 및 Refresh JWT token 초기화하여 DB저장
  - cookie Authentication, Refresh return
- signup
  - bcrypt 이용하여 password 암호화 하여 DB에 저장
- refresh JWT Token
  - cookie로 Refresh Token 유효성 검사 후 Authentication Token 재발급
- logout
  - cookie 값 초기화
  - refresh Token 삭제
- delete
  - user 정보 삭제

## License

Nest is [MIT licensed](LICENSE).
