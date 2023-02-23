import type { dataListType } from '@/pages/home';
import { Card, Image } from 'antd';
import styles from '../index.less';
import { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import { history } from 'umi';

interface Props {
  dataItem: dataListType;
}

const CardItem = ({ dataItem }: Props) => {
  const { nameList, age, dataTime, imgUrl, title, id } = dataItem;
  const [visible, setVisible] = useState(false);
  const editClick = () => {
    history.push(`/listDem/createItem?cardId=${id}`);
  };
  return (
    <>
      <Card
        hoverable
        title={title}
        className={styles.cardItemBox}
        extra={<EditOutlined onClick={editClick} />}
      >
        <Image
          width={100}
          onClick={() => setVisible(true)}
          preview={{ visible: false }}
          src={imgUrl}
          placeholder={true}
        />
        <p>{nameList.join(',')}</p>
        <p>{age}</p>
        <p>{dataTime}</p>
      </Card>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
        >
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
          <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
        </Image.PreviewGroup>
      </div>
    </>
  );
};
export default CardItem;
