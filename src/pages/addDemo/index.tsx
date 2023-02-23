import { useModel } from 'umi';
import { Button } from 'antd';

const AddDemo = () => {
  const { setUserState } = useModel('userInfo');
  return (
    <div style={{ color: 'blue', fontSize: '28px' }}>
      我是新增的内容
      <Button
        onClick={() => {
          setUserState({
            userName: '我被改变了',
            age: 1,
            idCard: 'USER',
          });
        }}
      >
        修改user内容
      </Button>
    </div>
  );
};
export default AddDemo;
