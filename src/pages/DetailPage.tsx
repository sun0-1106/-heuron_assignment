import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { setTarget } from '../redux/slice';
import { RootState } from '../redux/store';
import Canvas from '../components/Canvas';

const Container = styled.div`
  position: absolute;
  width: 900px;
  height: 850px;
  border: 1px solid pink;
`;
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 550;
`;
const Explain = styled.div`
  font-weight: 500;
`;
const Button = styled.button`
  position: absolute;
  right: 0;
  width: 80px;
  height: 40px;
  font-weight: 500;
`;
const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  top: 50px;
  width: 750px;
  height: 700px;
  border: 1px solid green;
`;

interface obj {
  author?: string;
  download_url?: string;
  height?: number;
  id?: string;
  url?: string;
  width?: number;
}

const DetailPage = () => {
  const [arts, setArts] = useState<obj[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { target, targetId } = useSelector((state: RootState) => state.target);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goToList = () => {
    navigate(`/`);
  };

  const getArts = () => {
    let datas: string = localStorage.getItem('arts')!;
    let parsed = JSON.parse(datas);
    setArts(parsed);
    setIsLoading(false);
  };

  const handleOnWheel = () => {
    for (let art of arts) {
      if (art.id === target.id) {
        let indexNow = arts.indexOf(target);
        if (indexNow === arts.length - 1) {
          dispatch(setTarget(arts[0]));
        } else {
          let newTarget = arts[indexNow + 1];
          dispatch(setTarget(newTarget));
        }
      }
    }
  };

  useEffect(() => {
    getArts();
  }, []);

  return (
    <Container onWheel={handleOnWheel}>
      <Title>Detail Page</Title>
      <Explain>마우스 휠을 움직여보세요</Explain>
      <Button
        onClick={() => {
          goToList();
        }}
      >
        뒤로 가기
      </Button>
      <Box>
        {arts.length > 0 && !isLoading ? (
          arts.map(art => {
            if (art.download_url === target.download_url) {
              return <Canvas key={art.id} targetUrl={art.download_url!} />;
            }
          })
        ) : isLoading ? (
          <Loading />
        ) : (
          <div>받아온 데이터 없음</div>
        )}
      </Box>
    </Container>
  );
};

export default DetailPage;
