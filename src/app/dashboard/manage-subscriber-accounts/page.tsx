// ----------------------------------------------------------------------

import ManageSubscriberAccounts from 'src/sections/manage-subscriber-accounts/view';

export const metadata = {
  title: 'Subscriber Accounts',
};

type SearchParams = {
  tab: string | string[] | undefined;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const tab = typeof searchParams.tab === 'string' ? searchParams.tab : undefined;

  return <ManageSubscriberAccounts tab={tab} />;
}
