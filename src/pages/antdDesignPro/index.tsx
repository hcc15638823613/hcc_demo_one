import {
  ProForm,
  ProFormDatePicker,
  ProFormDateRangePicker,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Col, message, Row, Space, Button } from 'antd';
import type { FormLayout } from 'antd/es/form/Form';
import axios from 'axios';
import { useState } from 'react';
import styles from './index.less';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useRef } from 'react';

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const [formLayoutType, setFormLayoutType] = useState<FormLayout>(
    LAYOUT_TYPE_HORIZONTAL,
  );
  const formRef = useRef<ProFormInstance>();
  const [grid, setGrid] = useState(true);
  const queryDataList = async () => {
    const resData = await axios.post('/mock/dataList', {
      name: 'hcc',
      age: 19,
      isTrue: true,
    });
    const formData = formRef?.current?.getFieldsValue();
    console.log(formData, 'formData-----');
    console.log(resData, 'resDataresData--------------------------------');
  };
  return (
    <div className={styles.formBox}>
      <ProForm<{
        name: string;
        company?: string;
        useMode?: string;
      }>
        formRef={formRef}
        layout={formLayoutType}
        grid={grid}
        rowProps={{
          gutter: [16, formLayoutType === 'inline' ? 16 : 0],
        }}
        submitter={{
          render: (props, doms) => {
            console.log(doms, 'doms----');
            return <div>崭新的按钮</div>;
          },
        }}
        onFinish={async (values) => {
          await waitTime(2000);
          console.log(values);
          message.success('提交成功');
        }}
        params={{}}
        request={async () => {
          await waitTime(100);
          return {
            name: '蚂蚁设计有限公司',
            useMode: 'chapter',
          };
        }}
      >
        <ProFormRadio.Group
          label="标签布局"
          radioType="button"
          fieldProps={{
            value: formLayoutType,
            onChange: (e) => setFormLayoutType(e.target.value),
          }}
          colProps={{
            span: 20,
          }}
          options={['horizontal', 'vertical', 'inline']}
        />
        <ProFormSwitch
          colProps={{
            span: 4,
          }}
          fieldProps={{
            onChange: setGrid,
          }}
          initialValue={true}
          label="grid开关"
          name="grid"
        />
        <ProFormText
          name="name"
          label="标题"
          tooltip="最长为 24 位"
          placeholder="请输入名称"
        />
        <ProFormText colProps={{ md: 12, xl: 8 }} name="company" label="姓名" />
        <ProFormDigit colProps={{ md: 12, xl: 8 }} name="phone" label="电话" />
        <ProFormText colProps={{ md: 12, xl: 8 }} name="email" label="邮箱" />
        <ProFormTextArea
          colProps={{ span: 24 }}
          name="address"
          label="详细的工作地址或家庭住址"
        />
        <ProFormDatePicker
          colProps={{ xl: 8, md: 12 }}
          label="入职日期"
          name="date"
        />
        <ProFormDateRangePicker
          colProps={{ xl: 8, md: 12 }}
          label="工作周期"
          name="dateRange"
        />
        <ProFormSelect
          colProps={{ xl: 8, md: 12 }}
          label="职位"
          name="level"
          valueEnum={{
            1: 'front end',
            2: 'back end',
            3: 'full stack',
          }}
        />
      </ProForm>
      <Button onClick={queryDataList}>请求接口数据</Button>
    </div>
  );
};
