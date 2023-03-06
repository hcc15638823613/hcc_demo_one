import Editor from '@monaco-editor/react';

interface Props {
  value?: string | undefined;
  changeValue?: (val: string | undefined) => void;
  height?: number;
  isREadOnly?: boolean;
}

const GraphEditor = ({ value, height, changeValue, isREadOnly }: Props) => {
  return (
    <div>
      <Editor
        language="typescript"
        width="100%"
        value={value}
        height={height || 600}
        defaultValue='const aaa="bbbbxxx"'
        onChange={(value: string | undefined) => {
          if (changeValue) changeValue(value);
        }}
        options={{
          theme: 'vs', // 编辑器主题颜色
          folding: true, // 是否折叠
          foldingHighlight: true, // 折叠等高线
          foldingStrategy: 'indentation', // 折叠方式  auto | indentation
          showFoldingControls: 'always', // 是否一直显示折叠 always | mouseover
          disableLayerHinting: true, // 等宽优化
          emptySelectionClipboard: false, // 空选择剪切板
          selectionClipboard: false, // 选择剪切板
          automaticLayout: true, // 自动布局
          codeLens: false, // 代码镜头
          scrollBeyondLastLine: false, // 滚动完最后一行后再滚动一屏幕
          colorDecorators: true, // 颜色装饰器
          accessibilitySupport: 'off', // 辅助功能支持  "auto" | "off" | "on"
          lineNumbers: 'on', // 行号 取值： "on" | "off" | "relative" | "interval" | function
          lineNumbersMinChars: 5, // 行号最小字符   number
          readOnly: isREadOnly, //是否只读  取值 true | false
        }}
      />
    </div>
  );
};
export default GraphEditor;
