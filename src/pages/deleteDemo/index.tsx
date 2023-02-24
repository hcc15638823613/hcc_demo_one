import Pie from '../g2plot/index';
import styles from './index.less';

const data = [
  {
    item: '实例1',
    count: 21,
    percent: 0.21,
    value: 20,
  },
  {
    item: '实例2',
    count: 17,
    percent: 0.17,
    value: 20,
  },
  {
    item: '实例3',
    count: 13,
    percent: 0.13,
    value: 20,
  },
  {
    item: '实例4',
    count: 9,
    percent: 0.09,
    value: 20,
  },
];
const DeleteDemo = () => {
  return (
    <div className={styles.g2Box}>
      <Pie dataList={data} />
    </div>
  );
};
export default DeleteDemo;
