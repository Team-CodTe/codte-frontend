'use client';

import { useMemo, useState } from 'react';

import { MOCK_PROBLEMS } from '@/api/mock/mockProblem';
import { MOCK_SOLUTION_NOTES } from '@/api/mock/mockSolutionNote';
import { MOCK_USERS } from '@/api/mock/mockUser';
import { useDebounce } from '@/hooks/useDebounce';

import { SolutionNoteTable } from './SolutionNoteTable';
import { solutionNoteTableColumns } from './SolutionNoteTableColumns';
import { SolutionNoteTableFooter } from './SolutionNoteTableFooter';
import { SolutionNoteTableHeader } from './SolutionNoteTableHeader';

export const SolutionNoteSection = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 200); // 디바운스 200ms 설정

  const handleClearSearch = () => {
    setSearchKeyword('');
  };

  const data = useMemo(() => {
    const problemMap = new Map(MOCK_PROBLEMS.map((p) => [p.id, p]));
    const userMap = new Map(MOCK_USERS.map((u) => [u.id, u]));

    return [...MOCK_SOLUTION_NOTES]
      .filter((note) => {
        if (!debouncedSearchKeyword) return true;

        const lowerKeyword = debouncedSearchKeyword.toLowerCase();
        const problem = problemMap.get(note.problemId);
        const user = userMap.get(note.userId);

        return (
          problem?.bojNumber.toString().includes(lowerKeyword) ||
          problem?.title.toLowerCase().includes(lowerKeyword) ||
          user?.username.toLowerCase().includes(lowerKeyword) ||
          note.content.toLowerCase().includes(lowerKeyword)
        );
      })
      .sort((a, b) => b.id - a.id);
  }, [debouncedSearchKeyword]);

  return (
    <div className="flex h-full flex-col space-y-3">
      <SolutionNoteTableHeader
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        onClearSearch={handleClearSearch}
      />
      <SolutionNoteTable data={data} columns={solutionNoteTableColumns} />
      <SolutionNoteTableFooter />
    </div>
  );
};
