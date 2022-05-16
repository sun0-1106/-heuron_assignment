import styled from 'styled-components';
import React, { useRef, useState, useEffect, RefObject } from 'react';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 900px;
  height: 100%;
  position: absolute;
  object-fit: cover;
  #canvas {
    width: 400px;
    height: 400px;
    border: 1px solid gray;
  }
`;

interface box {
  y: number;
  x: number;
  width: number;
  height: number;
}

const Canvas = ({ targetUrl }: { targetUrl: string }) => {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState();
  const [itemBoxes, setItemBoxes] = useState<box[]>([]);
  const [isClicked, setIsClicked] = useState(false);
  const [isRightClicked, setIsRightClicked] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext('2d');
    setCtx(ctx);
    const image = new Image();
    image.src = targetUrl;
    image.onload = () => {
      ctx?.drawImage(image, 0, 0, 300, 300);
    };
  }, []);

  const getNewBox = (startX: number, startY: number) => {
    return {
      y: startY,
      x: startX,
      width: 0,
      height: 0,
    };
  };

  //마우스 누를 때 (그리기 시작)
  const onMouseDown = (event: React.MouseEvent<HTMLElement>) => {
    const startX = event.nativeEvent.offsetX;
    const startY = event.nativeEvent.offsetY;
    const newBox = getNewBox(startX, startY);
    setItemBoxes([...itemBoxes, newBox]);
    setIsClicked(true);
  };

  //캔버스 내에서 움직일 때
  const onMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!isClicked) {
      return;
    }
    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = targetUrl;
    image.onload = () => {
      ctx?.drawImage(image, 0, 0, 300, 300);
    };

    const currentX = event.nativeEvent.offsetX;
    const currentY = event.nativeEvent.offsetY;

    const cloneBoxes = [...itemBoxes];
    const currentBox = cloneBoxes[cloneBoxes.length - 1];

    const width = currentX - currentBox.x;
    const height = currentY - currentBox.y;

    currentBox.width = width;
    currentBox.height = height;
    setItemBoxes([...cloneBoxes]);
  };

  const cancelDraw = () => {
    const cloneBoxes = [...itemBoxes];
    cloneBoxes.pop();
    setItemBoxes([...cloneBoxes]);
    setIsClicked(false);
    setIsRightClicked(false);
  };

  //마우스 뗄 때 (그리기 끝)
  const onMouseUp = (event: React.MouseEvent<HTMLElement>) => {
    const endX = event.nativeEvent.offsetX;
    const endY = event.nativeEvent.offsetY;

    const cloneBoxes = [...itemBoxes];
    const currentBox = cloneBoxes[cloneBoxes.length - 1];

    if (currentBox.x === endX || currentBox.y === endY) {
      //클릭만 하는경우 (드래그해서 그림 안그리는경우 -> 취소)
      cancelDraw();
      return;
    }
    setItemBoxes([...cloneBoxes]);
    let lastBox = itemBoxes[itemBoxes.length - 1];

    const canvas: any = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const image = new Image();
    // 왼쪽으로 드래그 : 이미지 확대/ 축소
    if (isClicked) {
      image.src = targetUrl;
      image.onload = () => {
        ctx?.drawImage(
          image,
          lastBox.x,
          lastBox.y,
          lastBox.width,
          lastBox.height,
        );
      };
      setIsClicked(false);
    }
    //오른쪽으로 드래그 : 이미지 회전
    if (isRightClicked) {
      ctx.rotate(90);
      image.onload = () => {
        ctx?.drawImage(
          image,
          lastBox.x,
          lastBox.y,
          lastBox.width,
          lastBox.height,
        );
      };
      setIsRightClicked(false);
    }
  };

  //캔버스 영역에서 나갈 때
  const onMouseOut = () => {
    if (isClicked || isRightClicked) cancelDraw();
  };

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext('2d');

    if (!ctx) return;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    let lastOne = itemBoxes.length - 1;
    let lastBox = itemBoxes[lastOne];

    //박스 style 설정
    context.strokeStyle = '#1ed5e2';
    context.fillStyle = 'rgba(148,245,96,0.1)';
    //설정 후 그리기
    if (itemBoxes.length > 0) {
      context.fillRect(lastBox.x, lastBox.y, lastBox.width, lastBox.height);
      context.strokeRect(lastBox.x, lastBox.y, lastBox.width, lastBox.height);
    }
  }, [ctx, itemBoxes]);

  const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
    setIsRightClicked(true);
    event.preventDefault();
  };

  return (
    <Container>
      {targetUrl ? (
        <canvas
          id='canvas'
          width='300'
          height='300'
          ref={canvasRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseOut={onMouseOut}
          onContextMenu={handleRightClick}
        ></canvas>
      ) : (
        <p>이미지를 다시 선택해주세요</p>
      )}
    </Container>
  );
};

export default Canvas;
