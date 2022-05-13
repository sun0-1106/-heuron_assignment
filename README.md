### 배포 링크

### 실행방법

npm install
npm run start

### 프로젝트 구조

### 라이브러리 사용 이유

### 어려웠던 점 / 고민한 점

List page의 return 부분에서 삼항 연산자를 사용할지, if/else 문을 사용할지
어떻게 써야 더욱 깔끔하게 코드로 나타낼 수 있을까 고민했습니다.<br>
<br>
List page와 detail page에서 같은 배열을 사용하기 때문에 전역 상태를 사용했습니다.<br>
이 때 redux를 사용할지 App.tsx에서 받아온 데이터를 상태에 저장시켜 props로 넘겨줄지 고민했습니다.<br>
redux toolkit을 이용해서 createAsyncThunk 메서드를 사용해 비동기 요청 후 받아온 상태를 store에 저장할까 고민했지만<br>
첫 렌더링시 한 번만 받아올 데이터이기도 하고, 코드의 양만 늘어날 것을 우려해 App.tsx에서 상태를 만들었습니다.
