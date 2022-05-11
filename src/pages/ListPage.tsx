import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

const Container = styled.div`
  width: 1200px;
  border: 1px solid blue;
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`;
const Box = styled.div`
  width: 500px;
  height: 300px;
  border: 1px solid green;
`;
const List = styled.div`
  font-weight: 500;
`;
const Art = styled.img`
  width: 300px;
  object-fit: cover;
`;

const Listpage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [arts, setArts] = useState<obj[]>([]);
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const res = await axios.get('https://picsum.photos/v2/list');
      if (res) {
        setIsLoading(false);
        setArts(res.data);
        console.log(arts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const goToDetail = () => {
    navigate(`/detail`);
  };

  useEffect(() => {
    getData();
  }, []);

  interface obj {
    author?: string;
    download_url?: string;
    height?: number;
    id?: string;
    url?: string;
    width?: number;
  }

  return (
    <Container>
      <Title>데이터 목록</Title>
      <List>사진을 클릭하면 상세 페이지로 이동할 수 있습니다</List>
      {arts.length > 0 && !isLoading ? (
        arts.map((el: obj) => (
          <Box key={el.id}>
            <List>작가 명</List>
            <div>{el.author}</div>
            <Art
              src={el.download_url}
              onClick={() => {
                goToDetail();
              }}
            ></Art>
          </Box>
        ))
      ) : isLoading ? (
        <Loading />
      ) : (
        <div>받아온 데이터가 없습니다</div>
      )}
    </Container>
  );
};

export default Listpage;
