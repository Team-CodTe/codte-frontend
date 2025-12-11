const StudyMainPage = () => {
  return (
    <main className="grid min-h-0 w-full flex-1 grid-cols-1 gap-8 p-5 lg:max-w-4/5 lg:grid-cols-2 lg:grid-rows-1 lg:py-6">
      <div className="flex min-h-0 flex-col gap-8 lg:h-full">
        {/** 오늘의 추천 문제 리스트 섹션 */}
        {/** 스터디 회원 목록 섹션 */}
      </div>

      <div className="h-full min-h-0">{/** 풀이 노트 목록 섹션 */}</div>
    </main>
  );
};

export default StudyMainPage;
