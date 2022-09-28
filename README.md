Nest project

## Config
- Winston Log
- Custom Repository
- TypeORM Config

## Auth
auth Module
![image](https://user-images.githubusercontent.com/80230648/192722202-41f24265-8eb0-4dd9-81d6-6762c6b8fdc6.png)

Type ORM, Type ORM Custom Repository, JWT Passport Module

auth Controller
![image](https://user-images.githubusercontent.com/80230648/192722881-939fe6f8-6289-4e21-b173-51663e306853.png)

-login
  - jwt 인증 및 Refresh JWT token 초기화하여 DB저장
  - cookie Authentication, Refresh return
- signup
  - bcrypt 이용하여 password 암호화 하여 DB에 저장
- refresh JWT Token
  - cookie로 Refresh Token 유효성 검사 후 Authentication Token 재발급
- logout
- delete

## License

Nest is [MIT licensed](LICENSE).
