import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Listpage = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [arts, setArts] = useState<obj[]>([]);

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
    <div>
      {arts.length > 0 ? (
        arts.map((el: obj) => (
          <div>
            <div>데이터 목록</div>
            <div>작가 명</div>
            <div>{el.author}</div>
          </div>
        ))
      ) : (
        <p>불러온 데이터가 없습니다</p>
      )}
    </div>
  );
};

export default Listpage;
