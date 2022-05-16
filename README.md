### 실행방법

npm install<br>
npm run start

### 프로젝트 구조

📦src<br>
┣ 📂components<br>
┃ ┣ 📜Canvas.tsx<br>
┃ ┣ 📜Loading.tsx<br>
┃ ┗ 📜UseDidMountEffect.ts<br>
┣ 📂pages<br>
┃ ┣ 📜DetailPage.tsx<br>
┃ ┗ 📜ListPage.tsx<br>
┣ 📂redux<br>
┃ ┣ 📜slice.ts<br>
┃ ┗ 📜store.ts<br>
┣ 📜App.css<br>
┣ 📜App.test.tsx<br>
┣ 📜App.tsx<br>
┣ 📜index.css<br>
┣ 📜index.tsx<br>
┣ 📜logo.svg<br>
┣ 📜react-app-env.d.ts<br>
┣ 📜reportWebVitals.ts<br>
┗ 📜setupTests.ts<br>

### 라이브러리 사용 이유

- redux-toolkit : 페이지끼리 전역상태를 공유하기 위해서 사용했습니다.
- redux-persist: 새로고침을 누를 경우에도 상태가 그대로 유지되도록 사용했습니다.
- react-router-dom: 페이지 이동을 위해서 사용했습니다.
- axios: 비동기 요청을 위해서 사용했습니다.
- styled-components: 자유로운 css 커스텀 컴포넌트를 만들기위해 사용했습니다.

### 어려웠던 점 / 고민한 점

List page의 return 부분에서 삼항 연산자를 사용할지, if/else 문을 사용할지
어떻게 써야 더욱 깔끔하게 코드로 나타낼 수 있을까 고민했습니다.<br>

useEffect가 mount시에 작동이 안되고 state가 변경될 때에만 작동하도록 customHook을 만들었습니다.<br>
<br>
canvas에서 드래그를 하면 이미지가 사라져서 다시 나타나게 하는 방법을 고민했습니다.<br>
이미지가 나타나게 만들었으나 이미지의 회전/확대/축소시 드래그되는 과정에서 이미지의 잔상이 나타납니다.<br>
이 부분이 어려웠습니다.
<br>
