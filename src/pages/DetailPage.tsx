import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';

const Container = styled.div`
  position: absolute;
  width: 900px;
  height: 850px;
  border: 1px solid pink;
`;
const Title = styled.div`
  font-weight: 550;
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
  top: 50px;
  width: 750px;
  height: 700px;
  border: 1px solid green;
`;
const Art = styled.img`
  width: 300px;
  object-fit: cover;
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

  // 불러온 이미지 목록중 canvas를 통해 1개의 이미지만 표시되게 처리
  //마우스 휠 이벤트에 따라 canvas에 이미지가 순차적으로 표시되어야함
  //마우스(왼쪽 클릭+ 드래그) 이벤트 발생시 이미지 확대/축소
  //마우스(오른쪽 클릭 + 드래그) 이벤트 발생시 이미지 회전

  //일단 상세화면에서 누른 이미지 하나만 보이게 만들어야함
  const navigate = useNavigate();

  const goToList = () => {
    navigate(`/`);
  };

  const getArts = () => {
    let datas: string = localStorage.getItem('arts')!;
    let parsed = JSON.parse(datas);
    setArts(parsed);
    setIsLoading(false);
  };

  useEffect(() => {
    getArts();
  }, []);

  return (
    <Container>
      <Title>Detail Page</Title>
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
            return <Art key={art.id} src={art.download_url} />;
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
