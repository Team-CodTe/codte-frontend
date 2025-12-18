'use client';

import { Skeleton } from '@/components/ui/Skeleton';
import MDEditor, {
  commands,
  type ICommand,
  type MDEditorProps,
} from '@uiw/react-md-editor';
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  SquareCode,
  Strikethrough,
  Table,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { useTheme } from 'next-themes';

const ICON_SIZE = 'size-6';

const createCommand = (base: ICommand, icon: React.ReactElement): ICommand => ({
  ...base,
  icon,
});

const customCommands = {
  heading1: createCommand(
    commands.heading1,
    <Heading1 className={ICON_SIZE} />,
  ),
  heading2: createCommand(
    commands.heading2,
    <Heading2 className={ICON_SIZE} />,
  ),
  heading3: createCommand(
    commands.heading3,
    <Heading3 className={ICON_SIZE} />,
  ),
  heading4: createCommand(
    commands.heading4,
    <Heading4 className={ICON_SIZE} />,
  ),
  bold: createCommand(commands.bold, <Bold className={ICON_SIZE} />),
  italic: createCommand(commands.italic, <Italic className={ICON_SIZE} />),
  strikethrough: createCommand(
    commands.strikethrough,
    <Strikethrough className={ICON_SIZE} />,
  ),
  code: createCommand(commands.code, <Code className={ICON_SIZE} />),
  codeBlock: createCommand(
    commands.codeBlock,
    <SquareCode className={ICON_SIZE} />,
  ),
  quote: createCommand(commands.quote, <Quote className={ICON_SIZE} />),
  link: createCommand(commands.link, <Link className={ICON_SIZE} />),
  table: createCommand(commands.table, <Table className={ICON_SIZE} />),
  unorderedListCommand: createCommand(
    commands.unorderedListCommand,
    <List className={ICON_SIZE} />,
  ),
  orderedListCommand: createCommand(
    commands.orderedListCommand,
    <ListOrdered className={ICON_SIZE} />,
  ),
};

const EDITOR_COMMANDS = [
  customCommands.heading1,
  customCommands.heading2,
  customCommands.heading3,
  customCommands.heading4,
  commands.divider,

  customCommands.bold,
  customCommands.italic,
  customCommands.strikethrough,
  commands.divider,

  customCommands.code,
  customCommands.codeBlock,
  commands.divider,

  customCommands.unorderedListCommand,
  customCommands.orderedListCommand,
  commands.divider,

  customCommands.quote,
  customCommands.link,
  customCommands.table,
];

type Props = {
  value: string;
  onChange: (value?: string) => void;
  placeholder?: string;
} & Omit<MDEditorProps, 'value' | 'onChange'>;

export const MarkdownEditor = ({
  value,
  onChange,
  placeholder = '마크다운으로 내용을 작성해보세요.',
  ...props
}: Props) => {
  const { resolvedTheme } = useTheme();

  const colorMode = resolvedTheme === 'dark' ? 'dark' : 'light';

  return (
    <div
      className="h-full w-full gap-4 md:grid md:grid-cols-2"
      data-color-mode={colorMode}>
      <div className="border-border h-full w-full overflow-y-auto rounded-md border">
        <MDEditor
          value={value}
          height="100%"
          onChange={onChange}
          preview="edit"
          visibleDragbar={false}
          commands={EDITOR_COMMANDS}
          extraCommands={[]}
          textareaProps={{ placeholder }}
          {...props}
        />
      </div>
      <div className="border-border hidden h-full w-full overflow-y-auto rounded-md border px-8 py-7 md:block">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export const DynamicMarkdownEditor = dynamic(
  () =>
    import('@/components/common/MarkdownEditor').then(
      (mod) => mod.MarkdownEditor,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" />,
  },
);
