import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';

const Container = styled.div`
  width: 300px;
  object-fit: cover;
  border: 3px solid red;
`;

const Canvas = ({ targetUrl }: { targetUrl: string }) => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState();
  const [isClicked, setIsClicked] = useState(false);
  //마우스 휠을 위로 올리면 arts배열의 target앞의 index art의 이미지가 target이 되어야함
  //마우스 휠을 아래로 내리면 arts배열의 뒤index art의 이미지가 target이 됌

  //마우스(왼쪽 클릭+ 드래그) 이벤트 발생시 이미지 확대/축소
  //마우스(오른쪽 클릭 + 드래그) 이벤트 발생시 이미지 회전
  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext('2d');
    //ctx.fillRect(0, 0, 300, 300); //x,y,width,height
    //setCtx(ctx);
    const image = new Image();
    image.src = targetUrl;
    image.onload = () => {
      ctx?.drawImage(image, 0, 0, 300, 300);
    };
  }, []);

  return (
    <Container>
      <canvas id='canvas' width='300' height='300' ref={canvasRef}></canvas>
    </Container>
  );
};

export default Canvas;
