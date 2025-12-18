import { Skeleton } from '@/components/ui/Skeleton';
import dynamic from 'next/dynamic';

export const BaseEditor = dynamic(
  () =>
    import('@/components/common/MarkdownEditor').then(
      (mod) => mod.MarkdownEditor,
    ),
  {
    ssr: false,
    loading: () => <Skeleton />,
  },
);
