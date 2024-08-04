import SubscriberDetails from 'src/sections/subscriber-details/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Subscriber Accounts',
};

type IProps = {
  params: {
    subscriberId: string;
  };
  searchParams: {
    tab: string | string[] | undefined;
  };
};

export default function Page({ params, searchParams }: IProps) {
  const tab = typeof searchParams.tab === 'string' ? searchParams.tab : undefined;

  return <SubscriberDetails tab={tab} />;
}
