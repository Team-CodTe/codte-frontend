type Props = {
  params: Promise<{
    id: string;
  }>;
};

const StudyMainPage = async ({ params }: Props) => {
  const { id } = await params;

  return <div>Study Main Page: {id}</div>;
};

export default StudyMainPage;
