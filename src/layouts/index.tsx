import type { IRouteComponentProps } from 'umi';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './index.less';

const Layout = ({ children }: IRouteComponentProps) => {
  return (
    <div className={styles.LayoutBox}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
