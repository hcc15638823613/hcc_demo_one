import { useState } from 'react';
import './index.less';
import VirtualScrollList from '@/components/virtual-scroll-list';
// import type { dataListType } from '../index';
// import axios from 'axios';

const getTestData = (length: number): string[] => {
  //   console.log(1122333, 'page----++');
  let dataList: string[] = [];
  for (let i = 0; i < length; i++) {
    dataList = [...dataList, `测试数据${Math.ceil(Math.random() * 10)}`];
  }
  return dataList;
};
const getMockDataList = (
  page: { current: number; pageSize: number },
  dataList: any[],
) => {
  const { current, pageSize } = page;
  const newList = dataList?.slice((current - 1) * pageSize, current * pageSize);
  return newList || [];
};

function App() {
  const [dataList, setDataList] = useState<string[]>([
    '11233',
    'mock2',
    'mock333',
  ]);
  //   const queryDataList = async () => {
  //     const resData = await axios.post('/mock/dataList', {
  //       username: '初始化项目入参',
  //       isTrue: true,
  //     });
  //     const list = resData?.data?.list || [];
  //     const newList = getMockDataList(page, list);
  //   };
  //   const [page, setPage] = useState<{ current: number; pageSize: number }>({
  //     current: 1,
  //     pageSize: 20,
  //   });
  const handleOnScrollBottom = () => {
    setTimeout(() => {
      setDataList(dataList.concat(getTestData(20)));
    }, 1000);
  };
  //   console.log(dataList, 'dataList---');
  return (
    <div className="App">
      <div className="list">
        <VirtualScrollList
          dataList={dataList}
          renderItem={(item, index) => <span>{item}</span>}
          onScrollBottom={() => {
            handleOnScrollBottom();
          }}
          onScroll={(e) => {
            // console.log(e);
          }}
          offset={30}
        />
      </div>
    </div>
  );
}

export default App;
