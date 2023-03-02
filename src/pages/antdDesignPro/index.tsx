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
import { message, Space, Button } from 'antd';
import type { FormLayout } from 'antd/es/form/Form';
import { useState } from 'react';
import styles from './index.less';
import type { ProFormInstance } from '@ant-design/pro-components';
import { useRef } from 'react';
import PicAuthCode from '@/components/dragVerification';
import { Prompt } from 'umi';

const LAYOUT_TYPE_HORIZONTAL = 'horizontal';

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};
const setCode = () => {
  const words = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
  let code = '';
  for (let i = 0; i < 4; i++) {
    code += words[Math.floor(Math.random() * 52)];
  }
  return code;
};

export default () => {
  const [formLayoutType, setFormLayoutType] = useState<FormLayout>(
    LAYOUT_TYPE_HORIZONTAL,
  );
  const formRef = useRef<ProFormInstance>();
  const [grid, setGrid] = useState(true);

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
            const resetClick = (doms || [])?.find(
              (item) => item?.key === 'rest',
            );
            const { onClick } = resetClick?.props;
            return (
              <Space>
                <Button onClick={onClick}>重置</Button>
                <Button
                  onClick={async () => {
                    await formRef?.current?.validateFields().then((res) => {
                      console.log(res, 'resData+++++');
                    });
                  }}
                >
                  提交
                </Button>
              </Space>
            );
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
            name: '皮克桃',
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
            name1: 'front end',
            name2: 'back end',
            name333: 'full stack',
          }}
        />
      </ProForm>
      <Prompt message="你确定要离开么？" />
      <PicAuthCode setCode={setCode} />
    </div>
  );
};
