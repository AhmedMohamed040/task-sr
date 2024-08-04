import InductionSiteView from 'src/sections/induction-site/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Induction Site',
};

type SearchParams = {
  tab: string | string[] | undefined;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const tab = typeof searchParams.tab === 'string' ? searchParams.tab : undefined;

  return <InductionSiteView tab={tab} />;
}
