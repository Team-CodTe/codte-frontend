'use client';

import { StudiesTable } from './StudiesTable';
import { studiesTableColumns } from './StudiesTableColumns';

export const StudiesFallback = () => {
  return (
    <StudiesTable data={[]} columns={studiesTableColumns} isLoading={true} />
  );
};
