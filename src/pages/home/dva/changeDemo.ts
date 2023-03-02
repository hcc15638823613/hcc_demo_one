// // //model.js 基本结构
// // export const DemoModel = {
// //   nameSpace: 'demo', // 定义model名，如果没声明，会以文件作为namespace
// //   state: {}, // 初始state 优先级小于initialState
// //   reducers: {
// //     // reducer 是 Action 处理器，用来处理同步操作，等同于redux里面的reducer,接收action,同步更新state
// //     getList(state, { payload }) {
// //       // 第二个参数为 action = {type,payload}
// //       //代码操作
// //       return payload;
// //     },
// //   },
// //   effects: {
// //     // Effect是一个 Generator 函数，内部使用 yield 关键字，标识每一步的操作
// //     *getRemote({ payload }, { put, call }) {
// //       // 这里每个函数都有两个参数，（action,effect), effect = {put,call,select}
// //       // put 触发一个action，类似于dispatch
// //       // call 执行异步函数，比如请求
// //       const data = yield call(getRemoteList);
// //       yield put({
// //         type: 'getList',
// //         payload: { data: data }, // 这里直接返回data会获取不到数据，因此我用对象又包了一层
// //       });
// //     },
// //     *delUser({ payload: { id } }, { put, call }) {
// //       const data = yield call(delUserData, { id });
// //       console.log(data, 'data----');
// //       yield put({
// //         type: 'getRemote',
// //         payload: {},
// //       });
// //     },
// //   },
// //   subscriptions: {
// //     setup({ dispatch, history }) {
// //       return history.listen(({ pathname }) => {
// //         // {pathname} = location
// //         if (pathname === '/') {
// //           dispatch({
// //             type: 'getRemote', // 监听到进入主页，派发query事件
// //           });
// //         }
// //       });
// //     },
// //   },
// // };
// import { Effect, Reducer, Subscription } from 'umi';

// export interface IndexModelState {
//   name: string;
// }

// export interface IndexModelType {
//   namespace: 'index';
//   state: IndexModelState;
//   effects: {
//     query: Effect;
//   };
//   reducers: {
//     save: Reducer<IndexModelState>;
//     // 启用 immer 之后
//     // save: ImmerReducer<IndexModelState>;
//   };
//   subscriptions: { setup: Subscription };
// }

// const IndexModel: IndexModelType = {
//   namespace: 'index',

//   state: {
//     name: '',
//   },

//   effects: {
//     *query({ payload }, { call, put }) {},
//   },
//   reducers: {
//     save(state, action) {
//       return {
//         ...state,
//         ...action.payload,
//       };
//     },
//     // 启用 immer 之后
//     // save(state, action) {
//     //   state.name = action.payload;
//     // },
//   },
//   subscriptions: {
//     setup({ dispatch, history }) {
//       return history.listen(({ pathname }) => {
//         if (pathname === '/') {
//           dispatch({
//             type: 'query',
//           });
//         }
//       });
//     },
//   },
// };

// export default IndexModel;
