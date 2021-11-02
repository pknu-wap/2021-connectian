### RBAC(Role-based access control) 기반 접근 통제
https://docs.nestjs.kr/security/authorization#basic-rbac-implementation

참고: 클래스 내 메소드 = 라우트 핸들러(handler) 라 표현

* roles.decorator
  * 핸들러에 roles 메타데이터 적용하는 데코레이터
  * @Roles(Role.Admin) 등
* roles.guard
  * 핸들러에 @UseGuards(RulesGuard) 통해 적용 
  * canActivate 를 오버라이딩
     1. requiredRoles 는 클래스 및 핸들러의 roles 메타데이터를 가져옴
     2. roles 메타데이터 없을 때 true 반환
     3. 핸들러의 context 를 가져와 request 의 세션을 추출
     4. requiredRoles 와 유저의 role 을 대조, boolean 을 반환
