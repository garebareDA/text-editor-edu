import React, { useEffect } from "react";

import { $getRoot, $getSelection } from 'lexical';
import LexicalComposer from '@lexical/react/LexicalComposer';
import RitchTextPlugin from '@lexical/react/LexicalRichTextPlugin';
import LexicalMarkdownShortcutPlugin from "@lexical/react/LexicalMarkdownShortcutPlugin";
import LexicalContentEditable from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import LexicalOnChangePlugin from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { EditorState, EditorThemeClasses } from 'lexical';

export const Editor = (): React.ReactElement => {
  const theme: EditorThemeClasses = {};
  const onChange = (editorState: EditorState) => {
    editorState.read(() => {
      const root = $getRoot();
      const selection = $getSelection();
      console.log(root, selection);
    });
  };

  const onError = (error: Error) => {
    console.error(error);
  };

  const AutoFoucusPlugin = ():null => {
    const [editor] = useLexicalComposerContext();
    useEffect(() => {
      editor.focus();
    }, [editor]);
    return null;
  };

  const initialConfig = {
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RitchTextPlugin
        contentEditable={<LexicalContentEditable />}
        placeholder={<div> text </div>}
      />
      <LexicalOnChangePlugin onChange={onChange}/>
      <HistoryPlugin />
      <LexicalMarkdownShortcutPlugin />
      <AutoFoucusPlugin />
    </LexicalComposer>
  );
};