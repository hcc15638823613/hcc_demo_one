import { Input, Popconfirm, Popover, Tree } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import styles from './index.less';
// import {debounce} from 'lodash'
// import { useDebounceFn } from '@ant-design/pro-components';
import GraphEditor from '@/components/GraphEditor/editorReact';
import {
  CloseCircleOutlined,
  DragOutlined,
  FolderAddOutlined,
  MoreOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';

const FuwuDemo = () => {
  const { DirectoryTree } = Tree;
  const [isDrap, setIsDrap] = useState<boolean>(false); // 是否在拖拽
  const [dataSetHeight, setDatasetHeight] = useState<number>(); // 高度
  const [isHover, setIsHover] = useState<boolean>(false); // 是否悬浮
  const [textTitle, setTextTitle] = useState<any>(); // 切换面板内容
  const [changeValue, setChanneValue] = useState<string>(''); // 搜索内容
  const [selectKey, setSelectKey] = useState<string[]>([]); // 文件展开key
  const [defauSelectKey, setDefauSelectKey] = useState<string[]>([]); // 点击清空搜索返回之前的状态
  const [dragMask] = useState<HTMLDivElement>(() => {
    const newMask = document.createElement('div');
    newMask.className = styles.dragMask;
    newMask.style.display = 'none';
    document.body.append(newMask);
    return newMask;
  });
  const [editIcon, setEditIcon] = useState<any>({});
  const [isEdit, setIsEdit] = useState<any>({});
  const treeData = [
    {
      title: 'parent 0',
      key: '0-0',
      children: [
        { title: 'leaf 0-0', key: '0-0-0', isLeaf: true },
        { title: 'leaf 0-1', key: '0-0-1', isLeaf: true },
        { title: '嗨啊嗨', key: '0-0-2', isLeaf: true },
      ],
    },
    {
      title: 'parent 1',
      key: '0-1',
      children: [
        { title: 'leaf 1-0', key: '0-1-0', isLeaf: true },
        { title: 'leaf 1-1', key: '0-1-1', isLeaf: true },
      ],
    },
  ];
  const onSelect = (keys: React.Key[], info: any) => {
    setTextTitle(info);
    if (!info?.node?.children) {
      return;
    }
  };

  useEffect(() => {
    const [min, max] = [10, 400];
    const onMouseMove = (e: MouseEvent) => {
      if (isDrap) {
        const target = document.querySelector('.bbBox'); // 获取dom实例
        if (target) {
          let panelHeight = e.pageY - target.getBoundingClientRect().top;
          if (panelHeight < min) {
            panelHeight = min;
          }
          if (panelHeight > max) {
            panelHeight = max;
          }
          setDatasetHeight(panelHeight);
        }
      }
    };

    const onMouseUp = () => {
      setIsDrap(false);
      dragMask.style.display = 'none';
    };

    document.body.addEventListener('mousemove', onMouseMove);
    document.body.addEventListener('mouseup', onMouseUp);
    return () => {
      document.body.removeEventListener('mousemove', onMouseMove);
      document.body.removeEventListener('mouseup', onMouseUp);
    };
  }, [isDrap, setIsDrap]);
  const aaas = () => {
    setIsDrap(true);
    dragMask.style.display = 'block';
  };
  const deleteEdit = (e: any, nodeData: any) => {
    e.stopPropagation();
    console.log(nodeData, 'nodeData');
  };
  const content = useCallback((nodeData: any) => {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={styles.exitButtonBox}
      >
        <Popconfirm
          onConfirm={(e) => {
            deleteEdit(e, nodeData);
          }}
          title={() => {
            return (
              <div>
                <h3>
                  {nodeData?.children
                    ? '确认删除这个文件夹吗'
                    : '你确定要删除吗？'}
                </h3>
                {nodeData?.children ? (
                  <div
                    style={{
                      fontSize: '14px',
                      color: 'rgba(0,10,26,0.68)',
                      marginTop: '12px',
                    }}
                  >
                    {nodeData?.children?.length
                      ? '删除后，该文件夹下的查询也将删除，不可恢复。'
                      : '删除后，该文件夹不可恢复。'}
                  </div>
                ) : null}
              </div>
            );
          }}
        >
          <p className={styles.buttonIcon}>删除</p>
        </Popconfirm>

        <p
          className={styles.buttonIcon}
          onClick={(e) => {
            e.stopPropagation();
            setIsEdit(nodeData);
          }}
          style={{ marginBottom: '-1px' }}
        >
          重命名
        </p>
      </div>
    );
  }, []);

  const editEnter = (e: any, nodeData: any) => {
    // 编辑操作调用接口
    console.log(e.target.value, '11111value');
    console.log(nodeData, 'nodeData22222');
  };
  const testfun = (str: string, key: string) => {
    // 搜索富文本替换
    if (!str?.includes(key)) {
      return;
    }
    let reg = new RegExp(key, 'g');
    let newst = str.replace(reg, '<font color=black>' + key + '</font>');
    return newst;
  };
  const childrenRender = useCallback(
    (nodeData: any) => {
      const xrarr = testfun(nodeData?.title, changeValue);
      return (
        <div
          style={{ width: '100%', height: '30px' }}
          onMouseMove={() => {
            setEditIcon(nodeData);
          }}
          onMouseLeave={() => {
            setEditIcon({});
          }}
        >
          {isEdit?.key === nodeData?.key ? (
            <Input
              style={{ float: 'left', width: '60%' }}
              defaultValue={nodeData?.title}
              onClick={(e) => {
                e.stopPropagation();
              }}
              onBlur={() => {
                setIsEdit({});
              }}
              onPressEnter={(e: any) => {
                editEnter(e, nodeData);
              }}
              ref={function (input) {
                if (input !== null) {
                  input.focus();
                }
              }}
            />
          ) : (
            <div
              className={styles.fwbBoox}
              dangerouslySetInnerHTML={{ __html: xrarr ?? nodeData?.title }}
            ></div>
          )}
          {editIcon?.key === nodeData?.key ? (
            <div style={{ float: 'right', marginTop: '3px' }}>
              <PlusOutlined
                style={{ marginRight: '20px' }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                title="新建查询"
              />
              <Popover
                overlayClassName={styles.propBox}
                content={content(nodeData)}
                trigger="click"
              >
                <MoreOutlined
                  style={{ color: 'black', marginTop: '4px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                />
              </Popover>
            </div>
          ) : null}
        </div>
      );
    },
    [changeValue, editIcon, isEdit],
  );
  const onExpand = (expandedKeys: any) => {
    setSelectKey(expandedKeys);
    setDefauSelectKey(expandedKeys);
  };
  const getTreeParents = (
    data: any,
    changeValues: string,
    parentKey: string[] = [],
  ) => {
    data.forEach((item: any) => {
      if (item.children && item.children.length) {
        const hildrenType = item?.children?.find((itType: any) => {
          return itType?.title?.includes(changeValues);
        });
        if (hildrenType) {
          parentKey.push(item?.key);
        }
        selectKey?.forEach((keyItem) => {
          if (item?.title?.includes(changeValues) && keyItem === item?.key) {
            parentKey.push(item?.key);
          }
        });
        const temp = getTreeParents(item.children, changeValues);
        if (temp.length) {
          parentKey.push(...temp);
        }
      }
    });
    return parentKey;
  };

  return (
    <div style={{ width: '100%' }}>
      <div className={styles.treeBox}>
        <div className={styles.leftBox}>
          <div className={styles.iconKaifaBox}>
            开发调试 <FolderAddOutlined className={styles.addIcon} />
          </div>
          <Input
            style={{ marginTop: '16px' }}
            prefix={<SearchOutlined />}
            placeholder="请输入关键词搜索"
            onChange={(e) => {
              setChanneValue(e.target.value);
              if (!e.target.value) {
                return;
              }
              const parentKey = getTreeParents(treeData, e.target.value);
              setSelectKey(Array.from(new Set(parentKey)));
            }}
            allowClear={{
              clearIcon: (
                <CloseCircleOutlined
                  onClick={() => {
                    setSelectKey(defauSelectKey);
                  }}
                />
              ),
            }}
          />
          <DirectoryTree
            expandedKeys={selectKey}
            multiple
            style={{ marginTop: '16px' }}
            blockNode
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
            titleRender={childrenRender}
          />
        </div>
        <div
          style={{ height: '100%', width: '100%', backgroundColor: 'white' }}
          className="bbBox"
        >
          <div
            style={{
              height: dataSetHeight ?? '40%',
              width: '100%',
              backgroundColor: 'white',
              overflowY: 'auto',
            }}
          >
            <div
              style={{
                maxHeight: '400px',
                paddingTop: '24px',
              }}
            >
              <GraphEditor isREadOnly={false} height={400} />
            </div>
          </div>
          <div
            className={styles.iconYidong}
            onMouseDown={() => {
              aaas();
            }}
            onMouseMove={() => {
              setIsHover(true);
            }}
            onMouseLeave={() => {
              setIsHover(false);
            }}
          >
            {isHover || isDrap ? (
              <DragOutlined className={styles.iconYii} />
            ) : null}
          </div>
          <div
            style={{
              height: dataSetHeight ? 600 - dataSetHeight : '40%',
              width: '100%',
              backgroundColor: 'white',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FuwuDemo;
