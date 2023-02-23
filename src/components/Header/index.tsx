import { history } from 'umi';
import { Button, Space } from 'antd';
import styles from './index.less';

const HeaderRouterData = [
  {
    text: '实验',
    isClick: true,
    hrefText: '/taskDemo',
  },
  {
    text: '服务',
    isClick: true,
    hrefText: '/addDemo',
  },
  {
    text: '|',
    isClick: false,
  },
  {
    text: '地图',
    isClick: true,
    hrefText: '/map',
  },
  {
    text: '可编辑表格',
    isClick: true,
    hrefText: '/deleteDemo',
  },
  {
    text: 'form表单',
    isClick: true,
    hrefText: '/proForm',
  },
];
const userInfo = {
  name: '浩辰',
  identity: 'ADMIN',
};

const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={styles.leftHeader}>
        <Space>
          {HeaderRouterData.map((item) => {
            return (
              <Button
                type="link"
                key={item.text}
                onClick={() => {
                  if (item.isClick) {
                    history.push(item.hrefText || '');
                  }
                }}
              >
                {item.text}
              </Button>
            );
          })}
        </Space>
      </div>
    </div>
  );
};
export default Header;
