import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import { useSelector, useDispatch } from 'react-redux';
import { setTarget } from '../redux/slice';
import { RootState } from '../redux/store';
import Canvas from '../components/Canvas';

const Container = styled.div`
  width: 900px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  padding-bottom: 10px;
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
  background-color: #5a5a5a;
  color: #fff;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  margin-right: 10px;
`;
const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 700px;
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
  const { target } = useSelector((state: RootState) => state.target);
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
      <TitleBox>
        <Title>Detail Page</Title>
        <Explain>마우스 휠을 움직여보세요</Explain>
        <Button
          onClick={() => {
            goToList();
          }}
        >
          뒤로 가기
        </Button>
      </TitleBox>
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
