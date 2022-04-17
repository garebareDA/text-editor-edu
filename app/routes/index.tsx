import React, { ChangeEvent, useEffect } from "react";

import { $getRoot, $getSelection } from 'lexical';
import LexicalComposer from '@lexical/react/LexicalComposer';
import LexicalPlainTextPlugin from '@lexical/react/LexicalPlainTextPlugin';
import LexicalContentEditable from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

import type { EditorState } from 'lexical';

export default function Index(): React.ReactElement {
  const theme = {};

  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      console.log(root, selection);
    });
  };

  const MyCustomAutoFocusPlugin = () => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      editor.focus();
    }
      , [editor]);
    return null;
  };

  const onError = (error: Error) => {
    console.error(error);
  };

  const initialConfig = {
    theme,
    onError,
  };


  return (
    <LexicalComposer initialConfig={initialConfig}>
      <LexicalPlainTextPlugin
        contentEditable={<LexicalContentEditable />}
        placeholder={<div>Enter some text...</div>}
      />
      <LexicalOnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
};
