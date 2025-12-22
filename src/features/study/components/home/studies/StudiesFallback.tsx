'use client';

import { StudiesTable } from './StudiesTable';
import { StudiesTableColumns } from './StudiesTableColumns';

export const StudiesFallback = () => {
  return (
    <StudiesTable data={[]} columns={StudiesTableColumns} isLoading={true} />
  );
};
