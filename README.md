### 배포 링크

### 실행방법

npm install
npm run start

### 프로젝트 구조

### 라이브러리 사용 이유

redux-toolkit

### 어려웠던 점 / 고민한 점

List page의 return 부분에서 삼항 연산자를 사용할지, if/else 문을 사용할지
어떻게 써야 더욱 깔끔하게 코드로 나타낼 수 있을까 고민했습니다.<br>
<br>

useEffect가 mount시에 작동이 안되고 state가 변경될 때에만 작동하도록 customHook을 만들었습니다.
