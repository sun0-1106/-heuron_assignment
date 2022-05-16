### 실행방법

npm install
npm run start

### 프로젝트 구조

📦src
┣ 📂components
┃ ┣ 📜Canvas.tsx
┃ ┣ 📜Loading.tsx
┃ ┗ 📜UseDidMountEffect.ts
┣ 📂pages
┃ ┣ 📜DetailPage.tsx
┃ ┗ 📜ListPage.tsx
┣ 📂redux
┃ ┣ 📜slice.ts
┃ ┗ 📜store.ts
┣ 📜App.css
┣ 📜App.test.tsx
┣ 📜App.tsx
┣ 📜index.css
┣ 📜index.tsx
┣ 📜logo.svg
┣ 📜react-app-env.d.ts
┣ 📜reportWebVitals.ts
┗ 📜setupTests.ts

### 라이브러리 사용 이유

- redux-toolkit : 페이지끼리 전역상태를 공유하기 위해서 사용했습니다.
- react-router-dom: 페이지 이동을 위해서 사용했습니다.
- axios: 비동기 요청을 위해서 사용했습니다.
- styled-components: 자유로운 css 커스텀 컴포넌트를 만들기위해 사용했습니다.

### 어려웠던 점 / 고민한 점

List page의 return 부분에서 삼항 연산자를 사용할지, if/else 문을 사용할지
어떻게 써야 더욱 깔끔하게 코드로 나타낼 수 있을까 고민했습니다.<br>

useEffect가 mount시에 작동이 안되고 state가 변경될 때에만 작동하도록 customHook을 만들었습니다.
<br>
canvas에서 드래그를 하면 이미지가 사라져서 다시 나타나게 하는 방법을 고민했습니다.<br>
이미지가 나타난다면 scale을 사용해서 이미지를 확대시키고, rotate를 사용해서 회전 시킬 수 있을 것 입니다.
