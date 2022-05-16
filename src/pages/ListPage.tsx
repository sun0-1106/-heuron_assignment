import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setTarget } from '../redux/slice';
import useDidMountEffect from '../components/UseDidMountEffect';

const Container = styled.div`
  width: 900px;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
const Title = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  padding-bottom: 10px;
`;
const TopBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const MidBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: #f8f8a8;
  border-radius: 15px;
`;
const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
`;
const List = styled.div`
  font-weight: 500;
  padding-bottom: 10px;
`;
const SubTitle = styled.div`
  font-weight: 500;
  padding-bottom: 10px;
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

const Listpage = () => {
  const [arts, setArts] = useState<obj[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [targetLocal, setTargetLocal] = useState<obj>({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await axios.get('https://picsum.photos/v2/list');
      if (res) {
        setIsLoading(false);
        setArts(res.data);
        localStorage.setItem('arts', JSON.stringify(res.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useDidMountEffect(() => {
    setTimeout(() => {
      dispatch(setTarget(targetLocal));
    }, 150);
    setTimeout(() => {
      navigate(`/detail`);
    }, 200);
  }, [targetLocal]);

  const handleChangeTargetLocal = (el: obj) => {
    let copied = Object.assign({}, el);
    setTargetLocal(copied);
  };

  return (
    <Container>
      <TopBox>
        <Title>데이터 목록</Title>
        <List>사진을 클릭하면 상세 페이지로 이동할 수 있습니다</List>
      </TopBox>
      <MidBox>
        {arts.length > 0 && !isLoading ? (
          arts.map((el: obj) => (
            <Box key={el.id}>
              <SubTitle>작가 명</SubTitle>
              <SubTitle>{el.author}</SubTitle>
              <Art
                src={el.download_url}
                alt='작품 사진'
                onClick={() => {
                  handleChangeTargetLocal(el);
                }}
              ></Art>
            </Box>
          ))
        ) : isLoading ? (
          <Loading />
        ) : (
          <div>받아온 데이터가 없습니다</div>
        )}
      </MidBox>
    </Container>
  );
};

export default Listpage;
