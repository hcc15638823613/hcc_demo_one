import { createFromIconfontCN } from '@ant-design/icons';

interface Props {
  type: string;
  className?: string;
  style?: any;
}

export default ({ type, className, style }: Props) => {
  // 新增图标后需要替换链接
  const ALIICONURL = '//at.alicdn.com/t/c/font_2530099_k753gaav4n8.js';
  const IconFont = createFromIconfontCN({
    scriptUrl: ALIICONURL,
  });
  return <IconFont type={type} className={className} style={style} />;
};
