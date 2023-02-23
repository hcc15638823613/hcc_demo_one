import Mock from 'mockjs';

const dataList = Mock.mock({
  code: '0',
  msg: 'success',
  'list|5': [
    {
      name: '@name',
      age: '@integer(18, 25)',
    },
  ],
});

Mock.mock('/mock/dataList', 'post', (res) => {
  const body = res.body;
  const result = JSON.parse(body);
  console.log(result);
  return dataList;
});
