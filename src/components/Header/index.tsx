import { history } from 'umi';
import { Button, Space } from 'antd';
import styles from './index.less';
import MenuList from './MenuList';

const HeaderRouterData = [
  {
    text: '实验',
    isClick: true,
    hrefText: '/taskDemo',
  },
  {
    text: '|',
    isClick: false,
  },
  {
    text: '列表',
    isClick: true,
    hrefText: '/listDem',
  },
  {
    text: '图例',
    isClick: true,
    hrefText: '/deleteDemo',
  },
  {
    text: 'form表单',
    isClick: true,
    hrefText: '/proForm',
  },
  {
    text: '画布',
    isClick: true,
    hrefText: '/canvasDemo',
  },
];

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
      <div className={styles.rightHeader}>
        <MenuList />
      </div>
    </div>
  );
};
export default Header;
