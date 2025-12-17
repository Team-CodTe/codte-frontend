'use client';

import '@mdxeditor/editor/style.css';
import '@/styles/globals.css';

import {
  BoldItalicUnderlineToggles,
  codeBlockPlugin,
  codeMirrorPlugin,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  headingsPlugin,
  InsertCodeBlock,
  InsertTable,
  InsertThematicBreak,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  type MDXEditorMethods,
  quotePlugin,
  Separator,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from '@mdxeditor/editor';
import { useTheme } from 'next-themes';

type Props = {
  markdown: string;
  editorRef?: React.RefObject<MDXEditorMethods | null>;
  onChange?: (markdown: string) => void;
};

export const InitializedMDXEditor = ({
  markdown,
  editorRef,
  onChange,
}: Props) => {
  const { resolvedTheme } = useTheme();
  const isDarkTheme = resolvedTheme === 'dark';

  return (
    <MDXEditor
      markdown={markdown}
      ref={editorRef}
      onChange={onChange}
      className={`prose dark:prose-invert mdxeditor-theme ${isDarkTheme ? 'dark-theme' : ''} mx-auto flex w-full max-w-2xl flex-col p-5 md:p-0`}
      plugins={[
        // 1. 기본 기능
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        thematicBreakPlugin(),
        tablePlugin(),
        markdownShortcutPlugin(),

        // 2. 링크 기능
        linkPlugin(),
        linkDialogPlugin(),

        // 3. 소스 보기 및 툴바
        diffSourcePlugin(),
        toolbarPlugin({
          toolbarContents: () => (
            <DiffSourceToggleWrapper options={['rich-text', 'source']}>
              {/* 히스토리 */}
              <UndoRedo />
              <Separator />

              {/* 텍스트 포맷 */}
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />

              {/* 구조 포맷 */}
              <ListsToggle />
              <InsertThematicBreak />
              <Separator />

              {/* 삽입 도구 */}
              <CreateLink />
              <InsertTable />
              <InsertCodeBlock />
            </DiffSourceToggleWrapper>
          ),
        }),

        // 4. 코드 블럭 (CodeMirror)
        codeBlockPlugin({ defaultCodeBlockLanguage: 'py' }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            py: 'Python',
            java: 'Java',
            js: 'JavaScript',
            c: 'C',
            cpp: 'C++',
            kotlin: 'Kotlin',
            swift: 'Swift',
          },
        }),
      ]}
    />
  );
};
