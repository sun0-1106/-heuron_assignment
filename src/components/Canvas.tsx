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
