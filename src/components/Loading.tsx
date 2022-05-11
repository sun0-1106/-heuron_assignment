import styled, { keyframes } from 'styled-components';

const CircleAnimation = keyframes`
  from {
    transform: translate(-50%, -50%) rotate(0);
  }
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`;
const Circle = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
  border: 10px solid #fff;
  border-top: 10px solid #20b2ed;
  border-radius: 30px;
  transition: all 0.2s;
  animation-name: ${CircleAnimation};
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
`;
const Dim = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

const Loading = () => {
  return (
    <>
      <Dim />
      <Circle />
    </>
  );
};

export default Loading;
