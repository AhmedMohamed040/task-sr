import ReportsStatistics from 'src/sections/reports-statistics/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Reports & Statistics',
};

type SearchParams = {
  tab: string | string[] | undefined;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const tab = typeof searchParams.tab === 'string' ? searchParams.tab : undefined;

  return <ReportsStatistics tab={tab} />;
}
