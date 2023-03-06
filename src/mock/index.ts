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
//TODO:改成换请求的方式
Mock.mock('/mock/dataList', 'post', (req) => {
  console.log(req, 'req---');
  const reqJson = JSON.parse(req.body);
  if (reqJson.username === '初始化项目入参') return dataList;
  return { list: [{ title: '112233', id: 1 }] };
});
Mock.mock('/workDemo', 'post', (req) => {
  console.log(req, 'zustand的模拟请求数据');
  return {
    headerData: [1, 2, 3, 4, 5, 6],
    inProcessData: ['a', 'b', 'c'],
    recentActivityData: [
      {
        id: 624748504,
        title: '活动名称一',
        readonly: '活动名称一',
        decs: '这个活动真好玩',
        state: 'open',
        created_at: '1590486176000',
        update_at: '1590486176000',
      },
      {
        id: 624691229,
        title: '活动名称二',
        readonly: '活动名称二',
        decs: '这个活动真好玩',
        state: 'closed',
        created_at: '1590481162000',
        update_at: '1590481162000',
      },
    ],
  };
});
