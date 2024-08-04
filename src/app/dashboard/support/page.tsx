// ----------------------------------------------------------------------

import Support from "src/sections/support/view";

export const metadata = {
  title: 'Support',
};

type SearchParams = {
  tab: string | string[] | undefined;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {

  return <Support />;
}
