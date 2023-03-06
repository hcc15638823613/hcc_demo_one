// import React, { forwardRef, useImperativeHandle } from 'react';
// import { EditorProvider, MonacoEnvironment } from 'monaco-editor';
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
// // import dsl from '@alipay/e2-language-gremlin';
// import elementResizeDetectorMaker from 'element-resize-detector';

// export interface GraphEditorRef {
//   doFormat: () => void;
//   getEditor: () => monaco.editor.IStandaloneCodeEditor | null;
// }

// interface Props {
//   initialValue?: string;
//   isReadOnly?: boolean;
//   height?: string | number;
//   onCreated?: (editor: any) => void;
//   onChange?: (content: string) => void;
//   onSelectChange?: (content: string) => void;
//   graphEditorRef?: React.MutableRefObject<GraphEditorRef | undefined>;
//   createConfig?: monaco.editor.IStandaloneEditorConstructionOptions;
// }

// /**
//  * gremlin editor based on E2
//  * @see https://yuque.antfin-inc.com/yuqi.pyq/fgetpa/ap3fnc
//  */
// export const GraphEditor: React.FC<Props> = forwardRef((props) => {
//   const {
//     initialValue,
//     isReadOnly = false,
//     height = '100%',
//     onCreated,
//     onChange,
//     onSelectChange,
//     graphEditorRef,
//     createConfig,
//   } = props;

//   const editorRef = React.useRef<HTMLDivElement | null>(null);
//   const [codeEditor, setCodeEditor] =
//     React.useState<monaco.editor.IStandaloneCodeEditor | null>(null);

//   // 监听 resize 事件
//   let erd: elementResizeDetectorMaker.Erd;
//   let erdElement: HTMLElement | null;

//   const onResize = () => {
//     if (codeEditor) {
//       codeEditor.layout();
//     }
//   };

//   const installElementResizeDetector = () => {
//     erd = elementResizeDetectorMaker({
//       strategy: 'scroll',
//     });
//     // eslint-disable-next-line react/no-find-dom-node
//     const node = editorRef && editorRef.current;
//     const parentNode = node && node.parentElement;
//     erdElement = parentNode;

//     if (parentNode) {
//       erd.listenTo(parentNode, onResize);
//     }
//   };

//   const uninstallElementResizeDetector = () => {
//     if (erd && erdElement) {
//       erd.uninstall(erdElement);
//     }
//   };

//   React.useEffect(() => {
//     MonacoEnvironment.loadModule(
//       async (container: { load: (arg0: any) => void }) => {
//         container.load('');
//       },
//     );
//     MonacoEnvironment.init().then(async () => {
//       if (editorRef && editorRef.current) {
//         const editorProvider =
//           MonacoEnvironment.container.get<EditorProvider>(EditorProvider);
//         const editor = editorProvider.create(editorRef.current, {
//           language: 'Gremlin',
//           value: initialValue,
//           suggestLineHeight: 24,
//           automaticLayout: true,
//           minimap: { enabled: false },
//           fontSize: 14,
//           lineHeight: 20,
//           folding: true,
//           wordWrap: 'on',
//           lineDecorationsWidth: 0,
//           lineNumbersMinChars: 3,
//           readOnly: isReadOnly,
//           suggestSelection: 'first',
//           wordBasedSuggestions: false,
//           suggest: { snippetsPreventQuickSuggestions: false },
//           autoClosingQuotes: 'always',
//           renderValidationDecorations: 'off',
//           ...createConfig,
//         });

//         setCodeEditor(editor.codeEditor);
//         installElementResizeDetector();

//         if (onCreated) {
//           onCreated(editor.codeEditor);
//         }

//         if (onChange) {
//           editor.codeEditor.onDidChangeModelContent(() =>
//             onChange(editor.codeEditor.getValue()),
//           );
//         }

//         if (onSelectChange) {
//           editor.codeEditor.onDidChangeCursorSelection(() => {
//             const selection = editor.codeEditor.getSelection();
//             const selected = editor.codeEditor
//               .getModel()
//               ?.getValueInRange(selection as monaco.IRange);
//             onSelectChange(selected || '');
//           });
//         }
//       }
//     });

//     return () => {
//       uninstallElementResizeDetector();
//       if (codeEditor) {
//         codeEditor.dispose();
//       }
//     };
//   }, [editorRef]);

//   const doFormat = (): Promise<boolean> => {
//     if (!codeEditor) {
//       return Promise.resolve(false);
//     }
//     const selection = codeEditor.getSelection();
//     const hasSelection = selection && !selection.isEmpty();
//     const action = codeEditor.getAction(
//       hasSelection
//         ? 'editor.action.formatSelection'
//         : 'editor.action.formatDocument',
//     );
//     if (action) {
//       return new Promise((resolve, reject) => {
//         action.run().then(
//           () => {
//             resolve(true);
//           },
//           (err: Error) => {
//             reject(err);
//           },
//         );
//       });
//     }
//     return Promise.reject(new Error('format not support'));
//   };
//   const getEditor = () => {
//     return codeEditor;
//   };
//   useImperativeHandle(graphEditorRef, () => {
//     return {
//       doFormat,
//       getEditor,
//     };
//   });

//   return (
//     <div style={{ width: '100%', height, borderRadius: 8 }} ref={editorRef} />
//   );
// });

// export default GraphEditor;
