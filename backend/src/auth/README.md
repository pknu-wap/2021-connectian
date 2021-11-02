### Passport 활용한 Google OAuth 인증
https://docs.nestjs.kr/security/authentication

1. /auth/google 접근
2. passport-google-oauth20 전략을 통해 OAuth URL 쿼리 생성
3. google.strategy 의 authorizationURL 옵션으로 passport 는 /auth/google/redirect 로 생성된 퀴리를 갖고 접근하도록 함
4. /auth/google/redirect 는 구글의 OAuth 인증 주소로 전달받은 쿼리 및 hd=pukyong.ac.kr 쿼리와 함께 리다이렉트하도록 함
5. OAuth 인증 후 /auth/google/callback 에서 세션처리 및 인증 종료, 리다이렉트 수행
