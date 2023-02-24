import Mock from 'mockjs';

const dataList = Mock.mock({
  code: '0',
  msg: 'success',
  'list|50-100': [
    {
      id: '@increment()',
      nameList: ['@name', '@name', '@name', '@name'],
      age: '@integer(18, 25)',
      dataTime: '@date(yyyy-MM-dd hh:mm:ss)',
      imgUrl: "@image('30x30', '#50B347','头像')",
      title: '@ctitle',
    },
  ],
});

Mock.mock('/mock/dataList', 'post', (res) => {
  // const body = res.body;
  // const result = JSON.parse(body);
  return dataList;
});
