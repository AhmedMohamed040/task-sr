// ----------------------------------------------------------------------

import SubscriptionPackages from 'src/sections/subscription-packages/view';

export const metadata = {
  title: 'Subscriber Accounts',
};

type SearchParams = {
  tab: string | string[] | undefined;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {

  return <SubscriptionPackages  />;
}
