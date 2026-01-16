'use client';

import { studiesColumns } from './StudiesColumns';
import { StudiesTable } from './StudiesTable';

export const StudiesFallback = () => {
  return <StudiesTable data={[]} columns={studiesColumns} isLoading={true} />;
};
