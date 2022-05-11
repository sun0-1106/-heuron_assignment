import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
const Container = styled.div`
  position: absolute;
  width: 500px;
  height: 850px;
  border: 1px solid pink;
`;
const Button = styled.button`
  position: absolute;
  right: 0;
  width: 80px;
  height: 40px;
  font-weight: 500;
`;
const DetailPage = () => {
  const navigate = useNavigate();

  const goToList = () => {
    navigate(`/`);
  };

  return (
    <Container>
      <Button
        onClick={() => {
          goToList();
        }}
      >
        뒤로 가기
      </Button>
    </Container>
  );
};

export default DetailPage;
