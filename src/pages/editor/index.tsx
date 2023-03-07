import GraphEditor from '@/components/GraphEditor/editorReact';
import { useState } from 'react';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag, Spin, Modal, Form } from 'antd';
import { useRef } from 'react';
import request from 'umi-request';
type GithubIssueItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  labels: {
    name: string;
    color: string;
  }[];
  state: string;
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at?: string;
};
const EditorDemo = () => {
  const [editorValue, setEditorValue] = useState<string | undefined>('');
  const [loading, setLoading] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  const onChangeEditorValue = (val: string | undefined) => {
    setEditorValue(val);
  };
  const columns: ProColumns<GithubIssueItem>[] = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '标题',
      dataIndex: 'title',
      // readonly: true,
      editable: false,
      copyable: true,
      ellipsis: true,
      tip: '标题过长会自动收缩',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'state',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        all: { text: '超长'.repeat(50) },
        open: {
          text: '未解决',
          status: 'Error',
        },
        closed: {
          text: '已解决',
          status: 'Success',
          disabled: true,
        },
        processing: {
          text: '解决中',
          status: 'Processing',
        },
      },
    },
    {
      disable: true,
      title: '标签',
      dataIndex: 'labels',
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, record) => (
        <Space>
          {record?.labels?.map(({ name, color }) => (
            <Tag color={color} key={name}>
              {name}
            </Tag>
          ))}
        </Space>
      ),
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'created_at',
      valueType: 'date',
      sorter: true,
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInSearch: true,
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          编辑
        </a>,
        <a
          key="view"
          onClick={() => {
            setIsOpenModal(true);
          }}
        >
          查看
        </a>,
        <TableDropdown
          key="actionGroup"
          onSelect={() => action?.reload()}
          menus={[
            { key: 'copy', name: '复制' },
            { key: 'delete', name: '删除' },
          ]}
        />,
      ],
    },
  ];
  const changeValuesync = async () => {
    setLoading(true);
    await setTimeout(() => {
      setEditorValue('const aaa="112233";\nconst bb="ccsx";\nlet va="eeerrtt"');
      setLoading(false);
    }, 3000);
  };

  return (
    <div>
      <Button
        onClick={() => {
          console.log(editorValue, 'editorValue---');
        }}
      >
        获取编辑器数据
      </Button>
      <Button onClick={changeValuesync}>修改编辑器数据</Button>

      <ProTable<GithubIssueItem>
        columns={columns}
        actionRef={actionRef}
        // params={}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter, '--++');
          console.log(params, 'params---');
          return request<{
            data: GithubIssueItem[];
          }>('https://proapi.azurewebsites.net/github/issues', {
            params,
          });
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto', // 在此处可以操作按钮的位置
          optionRender: (searchConfig, props, doms) => {
            const resetClick = (doms || [])?.find(
              (item: any) => item?.key === 'rest',
            ) as any;
            const { onClick } = resetClick?.props;
            return [<Button onClick={onClick}>来了啊</Button>];
          },
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: '1st item',
                  key: '1st',
                },
                {
                  label: '2nd item',
                  key: '2nd',
                },
                {
                  label: '3rd item',
                  key: '3rd',
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
      <Modal
        title="代码编辑"
        open={isOpenModal}
        onCancel={() => {
          setIsOpenModal(false);
        }}
        style={{ width: '100%' }}
        confirmLoading={modalLoading}
        onOk={() => {
          console.log(editorValue, 'editorValue---');
          setModalLoading(true);
          setTimeout(() => {
            setIsOpenModal(false);
            setModalLoading(false);
          }, 2000);
        }}
      >
        <Spin spinning={loading}>
          <div
            style={{
              width: '100%',
            }}
          >
            <GraphEditor
              value={editorValue}
              changeValue={onChangeEditorValue}
              isREadOnly={false}
            />
          </div>
        </Spin>
      </Modal>
    </div>
  );
};
export default EditorDemo;
