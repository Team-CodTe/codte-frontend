import dynamic from 'next/dynamic';

export const BaseEditor = dynamic(
  () =>
    import('@/components/common/InitializedMDXEditor').then(
      (mod) => mod.InitializedMDXEditor,
    ),
  {
    ssr: false,
  },
);
