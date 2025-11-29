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
    return [...MOCK_SOLUTION_NOTES]
      .filter((note) => {
        if (!debouncedSearchKeyword) return true;

        const lowerKeyword = debouncedSearchKeyword.toLowerCase();
        const problem = MOCK_PROBLEMS.find((p) => p.id === note.problemId);
        const user = MOCK_USERS.find((u) => u.id === note.userId);

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
    <div className="flex h-full flex-col space-y-3 lg:pb-12">
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
