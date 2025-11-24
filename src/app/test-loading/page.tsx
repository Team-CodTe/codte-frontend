async function getSlowData() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    message: '서버 데이터 로딩 완료!',
    timestamp: new Date().toISOString(),
  };
}

const LoadingPage = async () => {
  const data = await getSlowData();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-2xl font-bold">로딩 테스트</h1>
        <p className="mb-2">{data.message}</p>
        <p className="text-sm text-gray-500">{data.timestamp}</p>
      </div>
    </div>
  );
};

export default LoadingPage;
