import React, { useState, useEffect } from 'react';
import api from './api';

const ExampleComponent = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await api.get('/endpoint'); // Thay đổi '/endpoint' thành endpoint tương ứng trên backend của bạn
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={fetchData}>Gọi API</button>
      {data && <p>{data}</p>}
    </div>
  );
};

export default ExampleComponent;