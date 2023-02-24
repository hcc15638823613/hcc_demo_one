import { history, Redirect } from 'umi';
import type { IRouteComponentProps } from 'umi';

export default function Auth(props: IRouteComponentProps) {
  //获取本地缓存 localStorage的值
  const isLogin = localStorage.getItem('userInfo');

  //如果这个值存在就返回正常内容
  if (isLogin) {
    return <div>{props.children}</div>;
  } else {
    //如果这个值存在就重定向到登录页
    history.push('/login');
    return <Redirect to="/login" />;
  }
}
