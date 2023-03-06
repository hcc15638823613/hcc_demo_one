import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import * as monaco from 'monaco-editor';
// import type {IEditor} from 'monaco-editor/esm/vs/editor/editor.api'
// export interface GraphEditorRef {
//   doFormat: () => void;
//   getEditor: () => monaco.editor.IStandaloneCodeEditor | null;
// }
const GraphEditor: React.FC = () => {
  const monacoEditorRef = useRef<any>();
  const monacoEditorDomRef = useRef<any>();

  const [yamlValue, setYamlValue] = useState<string>('');

  useEffect(() => {
    newMonaco();
    return () => {
      monacoEditorRef.current.dispose(); // 卸载编辑器
      monacoEditorRef.current = undefined;
    };
  }, []);

  const newMonaco = () => {
    try {
      monacoEditorRef.current = monaco.editor.create(
        monacoEditorDomRef.current,
        {
          // value: yamlValue,
          // language: 'javascript', // 编辑器类型支持
          // minimap: { enabled: false }, // 小地图
          // automaticLayout: true, // 自动布局,
          // codeLens: true,
          // colorDecorators: true,
          // contextmenu: false,
          // readOnly: false, //是否只读
          // formatOnPaste: true,
          // overviewRulerBorder: true, // 滚动条的边框
          // scrollBeyondLastLine: true,
          // theme: 'vs', // 主题
          // fontSize: 16, // 字体
          // suggestSelection: 'first',
          // wordBasedSuggestions: false,
          // // renderValidationDecorations: 'off',
          // autoClosingQuotes: 'always',
          // // suggest: { snippetsPreventQuickSuggestions: false },
          // suggestLineHeight: 24,
          // formatOnType: true,
          // selectionHighlight: true,
          value: yamlValue,
          language: 'javascript',
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
          readOnly: false, //是否只读  取值 true | false
          renderValidationDecorations: 'on',
        },
      );
      monaco.languages.registerCompletionItemProvider('javascript', {
        provideCompletionItems() {
          return {
            suggestions: [],
          };
        },
      });

      // onDidChangeModelContent，方法产生的监听需要在组件销毁的时候dispose下
      monacoEditorRef.current.onDidChangeModelContent((e: any) => {
        try {
          let newValue = monacoEditorRef.current.getValue();
          setYamlValue(newValue);
        } catch {}
      });
    } catch {}
  };
  console.log(yamlValue, 'yamlValue0----');
  return (
    <div
      className="taskLoopSQL"
      ref={monacoEditorDomRef}
      style={{ width: '100%', height: '500px', borderRadius: '8px' }}
    />
  );
};
export default GraphEditor;
// import { useEffect, useRef } from 'react';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// import { Button } from 'antd';

// const GraphEditor = () => {
//   const monacoEditorRef = useRef<any>();
//   const monacoEditorDomRef = useRef<any>();

//   useEffect(() => {
//     newMonaco();
//     return () => {
//       monacoEditorRef.current.dispose(); // 卸载编辑器
//       monacoEditorRef.current = undefined;
//     };
//   }, []);

//   const newMonaco = () => {
//     try {
//       monacoEditorRef.current = monaco.editor.createDiffEditor(
//         monacoEditorDomRef.current,
//         {
//           minimap: { enabled: false }, // 小地图
//           automaticLayout: true, // 自动布局,
//           codeLens: true,
//           colorDecorators: true,
//           contextmenu: false,
//           readOnly: false, //是否只读
//           formatOnPaste: true,
//           overviewRulerBorder: false, // 滚动条的边框
//           scrollBeyondLastLine: true,
//           theme: 'vs', // 主题
//           fontSize: 12, // 字体
//         },
//       );
//     } catch {}
//   };

//   return (
//     <>
//       <Button
//         type="primary"
//         onClick={() => {
//           monacoEditorRef.current.setModel({
//             original: monaco.editor.createModel('哈哈哈哈', 'json/string'),
//             modified: monaco.editor.createModel('呜呜呜呜', 'json/string'),
//           });
//         }}
//       >
//         生成对比数据
//       </Button>
//       <div
//         className="taskLoopSQL"
//         ref={monacoEditorDomRef}
//         style={{ width: '100%', height: '500px', borderRadius: '8px' }}
//       />
//     </>
//   );
// };
// export default GraphEditor;
