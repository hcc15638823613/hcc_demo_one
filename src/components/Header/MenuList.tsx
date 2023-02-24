import type { MenuProps } from 'antd';
import { Dropdown, Avatar } from 'antd';
import { useModel } from 'umi';

const MenuList = () => {
  const { userState } = useModel('userInfo');
  const { userName, age, idCard } = userState;

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <a>姓名：{userName}</a>,
    },
    {
      key: '2',
      label: <a>年龄：{age}</a>,
    },
    {
      key: '3',
      label: <a>身份:{idCard === 'ADMIN' ? '管理员' : '用户'}</a>,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} placement="bottom">
        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      </Dropdown>
    </>
  );
};
export default MenuList;
