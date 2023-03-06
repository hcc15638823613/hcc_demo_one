import axios from 'axios';
import create from 'zustand';

export interface StateType {
  votes: number;
}
export const useStore = create((set: any, get: any) => ({
  votes: 0,
  headerData: [],
  inProcessData: [],
  recentActivityData: [],
  addVotes: () => set((state: StateType) => ({ votes: state.votes + 1 })),
  decreaseVotes: () => set((state: StateType) => ({ votes: state.votes - 1 })),
  getWorkBeachData: async (params?: any) => {
    // 异步操作
    // const votes = get().votes; // 获取上面初始化定义或者被改变的votes的值
    const res = await axios.post('/workDemo', params);
    const { headerData, inProcessData, recentActivityData } = res.data;
    set({
      headerData,
      inProcessData,
      recentActivityData,
    });
  },
}));
