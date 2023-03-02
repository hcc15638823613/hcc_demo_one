import type { IRouteComponentProps } from 'umi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './index.less';
import { WaterMark } from '@ant-design/pro-components';
import { useModel } from 'umi';

const Layout = ({ children }: IRouteComponentProps) => {
  const { userState } = useModel('userInfo');
  const { userName } = userState;
  return (
    <div className={styles.LayoutBox}>
      <Header />
      <WaterMark
        content={userName}
        fontSize={24}
        width={200}
        fontColor="rgba(12,12,12,0.6)"
        rotate={-44}
      >
        <div style={{ height: '100%' }}>{children}</div>
      </WaterMark>
      <Footer />
    </div>
  );
};

export default Layout;
