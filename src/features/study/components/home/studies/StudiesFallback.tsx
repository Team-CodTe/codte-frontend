'use client';

import { StudiesTable } from './StudiesTable';
import { STUDIES_TABLE_COLUMNS } from './StudiesTableColumns';

export const StudiesFallback = () => {
  return (
    <StudiesTable data={[]} columns={STUDIES_TABLE_COLUMNS} isLoading={true} />
  );
};
