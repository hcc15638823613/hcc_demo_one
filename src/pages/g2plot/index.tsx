import { Chart } from '@antv/g2';
import React, { useEffect, useState } from 'react';
import { ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';

const { Statistic } = StatisticCard;

interface PieProps {
  dataList: any;
}
const Pie: React.FC<PieProps> = (props: any) => {
  const [responsive, setResponsive] = useState(false);
  const { dataList } = props;
  const data = dataList;
  const initial = () => {
    const chart = new Chart({
      container: 'container',
      autoFit: true,
      height: 500,
      width: 500,
      //   zIndex: 10000
    });
    const innerView = chart.createView();
    chart.coordinate('theta', {
      radius: 0.75,
      innerRadius: 0.5,
    });
    chart.data(data);
    chart.scale('percent', {
      formatter: (val) => {
        val = val * 100 + '%';
        return val;
      },
    });

    chart.tooltip(false);
    // 声明需要进行自定义图例字段： 'item'
    chart.legend('item', {
      //   layout: 'horizontal',
      position: 'right', // 配置图例显示位置
      custom: true, // 关键字段，告诉 G2，要使用自定义的图例
      offsetX: -75,
      flipPage: false,
      maxWidthRatio: 0.4,
      max: 20,
      items: data.map(
        (obj: { item: any; percent: any }, index: string | number) => {
          return {
            name: obj.item, // 对应 itemName
            value: obj.percent, // 对应 itemValue
            marker: {
              symbol: 'square', // marker 的形状
              style: {
                r: 5, // marker 图形半径
                fill: chart.getTheme().colors10[index], // marker 颜色，使用默认颜色，同图形对应
              },
            }, // marker 配置
          };
        },
      ),
      itemValue: {
        style: {
          fill: '#999',
        }, // 配置 itemValue 样式
        formatter: (val) => `${(val as unknown as number) * 100}%`, // 格式化 itemValue 内容
      },
    });
    chart.scale('value', { nice: true });

    chart
      .interval()
      .adjust('stack')
      .position('percent')
      .color('item')
      .style({
        fillOpacity: 1,
      })
      .state({
        active: {
          style: (element) => {
            const shape = element.shape;
            return {
              lineWidth: 10,
              stroke: shape.attr('fill'),
              strokeOpacity: shape.attr('fillOpacity'),
            };
          },
        },
      });
    // 移除图例点击过滤交互
    chart.removeInteraction('legend-filter');
    chart.interaction('element-active');

    // 监听 element 上状态的变化来动态更新 Annotation 信息
    // 监听 element 上状态的变化来动态更新 Annotation 信息
    chart.on(
      'element:statechange',
      (ev: {
        gEvent: {
          originalEvent: { state: any; stateStatus: any; element: any };
        };
      }) => {
        const { state, stateStatus, element } = ev.gEvent.originalEvent;

        // 本示例只需要监听 active 的状态变化
        if (state === 'active') {
          const data = element.getData();
          if (stateStatus) {
            // 更新 Annotation
            updateAnnotation(data);
          } else {
            // 隐藏 Annotation
            clearAnnotation();
          }
        }
      },
    );

    // 绘制 annotation
    let lastItem: null;
    function updateAnnotation(data: { item: null; count: any }) {
      if (data.item !== lastItem) {
        innerView.annotation().clear(true);
        innerView
          .annotation()
          .text({
            position: ['50%', '50%'],
            content: data.item,
            style: {
              fontSize: 12,
              fill: '#333',
              textAlign: 'center',
            },
            offsetY: -5,
          })
          .text({
            position: ['50%', '50%'],
            content: data.count,
            style: {
              fontSize: 12,
              fill: '#333',
              textAlign: 'center',
            },
            // offsetX: -10,
            offsetY: 8,
          })
          .text({
            position: ['50%', '50%'],
            content: '',
            style: {
              fontSize: 20,
              fill: '#8c8c8c',
              textAlign: 'center',
            },
            offsetY: 20,
            offsetX: 20,
          });
        innerView.render(true);
        lastItem = data.item;
      }
    }

    // 清空 annotation
    function clearAnnotation() {
      innerView.annotation().clear(true);
      innerView.render(true);
      lastItem = null;
    }
    chart.render();
  };
  useEffect(() => {
    initial();
  }, []);
  return (
    <>
      <div
        id="container"
        style={{ width: 320, display: 'flex', marginLeft: 150 }}
      />
      <RcResizeObserver
        key="resize-observer"
        onResize={(offset) => {
          setResponsive(offset.width < 596);
        }}
      >
        <ProCard split={responsive ? 'horizontal' : 'vertical'}>
          <StatisticCard
            colSpan={responsive ? 24 : 6}
            title="财年业绩目标"
            statistic={{
              value: 82.6,
              suffix: '亿',
              description: (
                <Statistic title="日同比" value="6.47%" trend="up" />
              ),
            }}
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/PmKfn4qvD/mubiaowancheng-lan.svg"
                alt="进度条"
                width="100%"
              />
            }
            footer={
              <>
                <Statistic
                  value="70.98%"
                  title="财年业绩完成率"
                  layout="horizontal"
                />
                <Statistic
                  value="86.98%"
                  title="去年同期业绩完成率"
                  layout="horizontal"
                />
                <Statistic
                  value="88.98%"
                  title="前年同期业绩完成率"
                  layout="horizontal"
                />
              </>
            }
          />
          <StatisticCard.Group
            colSpan={responsive ? 24 : 18}
            direction={responsive ? 'column' : undefined}
          >
            <StatisticCard
              statistic={{
                title: '财年总收入',
                value: 601987768,
                description: (
                  <Statistic title="日同比" value="6.15%" trend="up" />
                ),
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="折线图"
                  width="100%"
                />
              }
            >
              <Statistic
                title="大盘总收入"
                value={1982312}
                layout="vertical"
                description={
                  <Statistic title="日同比" value="6.15%" trend="down" />
                }
              />
            </StatisticCard>
            <StatisticCard
              statistic={{
                title: '当日排名',
                value: 6,
                description: (
                  <Statistic title="日同比" value="3.85%" trend="down" />
                ),
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="折线图"
                  width="100%"
                />
              }
            >
              <Statistic
                title="近7日收入"
                value={17458}
                layout="vertical"
                description={
                  <Statistic title="日同比" value="6.47%" trend="up" />
                }
              />
            </StatisticCard>
            <StatisticCard
              statistic={{
                title: '财年业绩收入排名',
                value: 2,
                description: (
                  <Statistic title="日同比" value="6.47%" trend="up" />
                ),
              }}
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/zevpN7Nv_/xiaozhexiantu.svg"
                  alt="折线图"
                  width="100%"
                />
              }
            >
              <Statistic
                title="月付费个数"
                value={601}
                layout="vertical"
                description={
                  <Statistic title="日同比" value="6.47%" trend="down" />
                }
              />
            </StatisticCard>
          </StatisticCard.Group>
        </ProCard>
      </RcResizeObserver>
    </>
  );
};
export default Pie;
