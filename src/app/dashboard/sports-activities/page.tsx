import SportsView from 'src/sections/sports-activities/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Sports Activities',
};

type SearchParams = {
  tab: string | string[] | undefined;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const tab = typeof searchParams.tab === 'string' ? searchParams.tab : undefined;

  return <SportsView tab={tab} />;
}
