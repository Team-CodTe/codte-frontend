'use client';

import { Skeleton } from '@/components/ui/Skeleton';
import MDEditor from '@uiw/react-md-editor';
import dynamic from 'next/dynamic';

type Props = {
  value: string;
};

export const MarkdownPreview = ({ value }: Props) => {
  return <MDEditor.Markdown source={value} />;
};

export const DynamicMarkdownPreview = dynamic(
  () =>
    import('@/components/common/MarkdownPreview').then(
      (mod) => mod.MarkdownPreview,
    ),
  {
    ssr: false,
    loading: () => <Skeleton className="h-full w-full" />,
  },
);
