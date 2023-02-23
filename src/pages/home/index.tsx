import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './index.less';
import CardItem from './components/card';
import { List, Carousel } from 'antd';
export interface dataListType {
  id: number;
  nameList: string[];
  age: number;
  dataTime: any;
  imgUrl: string;
  title: string;
}
const contentStyle: React.CSSProperties = {
  height: '200px',
  color: '#fff',
  lineHeight: '200px',
  textAlign: 'center',
  background: '#364d79',
};
const CardList = () => {
  const [dataListState, setDataListState] = useState<dataListType[]>([]);
  const queryDataList = async () => {
    const resData = await axios.post('/mock/dataList', {
      name: 'hcc',
      isTrue: true,
    });
    const list = resData?.data?.list || [];
    setDataListState(list);
  };
  useEffect(() => {
    queryDataList();
  }, []);
  return (
    <div className={styles.listBox}>
      <div className={styles.headerBox}>
        <Carousel autoplay>
          <div>
            <h3 style={contentStyle}>欢迎来到对抗路!!!!!!</h3>
          </div>
          <div>
            <h3 style={contentStyle}>阿里嘎多妈妈哈哈</h3>
          </div>
          <div>
            <h3 style={contentStyle}>统统推到</h3>
          </div>
          <div>
            <h3 style={contentStyle}>摩西摩西</h3>
          </div>
        </Carousel>
      </div>
      <List
        className={styles.listCrd}
        grid={{ gutter: 16, column: 4 }}
        dataSource={dataListState}
        renderItem={(item) => {
          return (
            <List.Item>
              <CardItem dataItem={item} key={item.id} />
            </List.Item>
          );
        }}
      />
    </div>
  );
};
export default CardList;
