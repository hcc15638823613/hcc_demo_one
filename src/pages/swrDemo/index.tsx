import { Button, Spin } from 'antd';
import axios from 'axios';
// import useSWR from 'swr';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { useStore } from '@/pages/zustand/useStore';
import IconFont from '@/components/iconFont';
import styles from './index.less';

const SwrDemo = () => {
  async function sendRequest(
    url: string,
    { arg }: { arg: { username: string } },
  ) {
    return axios.post(url, arg).then((res) => {
      return res.data;
    });
  }
  const getVotes = useStore((state) => state.votes);
  const getWorkerDemo = useStore((state) => state.getWorkBeachData);
  const [headerData, inProcessData, recentActivityData] = useStore((state) => [
    state.headerData,
    state.inProcessData,
    state.recentActivityData,
  ]);
  console.log(getVotes, 'getVotes---');
  console.log(headerData, inProcessData, recentActivityData, '------');
  //   const fetcher = async ([url, obj]: any) =>
  //     axios.post(url, { obj }).then((res) => res.data);
  //   const {
  //     data,
  //     error,
  //     isLoading: DataLoading,
  //   } = useSWR(['/mock/dataList', { user: 'hcc1', name: 'hcc22' }], fetcher);
  const {
    trigger,
    isMutating,
    data: listData,
  } = useSWRMutation('/mock/dataList', sendRequest);
  //   useEffect(() => {
  //     if (!DataLoading) {
  //       //   console.log(data, 'datadata--');
  //     }
  //   }, [DataLoading]);

  useEffect(() => {
    trigger({ username: '初始化项目入参' });
  }, []);

  return (
    <div>
      <Spin spinning={isMutating}>
        {listData?.list?.map((item: any) => {
          return <div key={item?.id}>{item?.title}</div>;
        })}
        <Button>Swr请求</Button>
        <Button
          onClick={() => {
            trigger({ username: 'hcc更改122' });
          }}
        >
          点击触发请求
        </Button>
        <Button
          onClick={() => {
            getWorkerDemo({ name: '1', age: '2' });
          }}
        >
          zustand请求触发
        </Button>
      </Spin>
      <IconFont type="icon-xiaoxi" className={styles.iconXiaoxi} />
    </div>
  );
};
export default SwrDemo;
