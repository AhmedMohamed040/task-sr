'use client';

import { useMemo } from 'react';

import { Tab, Tabs, Container, Box } from '@mui/material';

import { useQueryString } from 'src/hooks/use-queryString';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import SubscriptionStatus from './tabs/subscription-status';
import SubscriberAccounts from './tabs/subscriber-accounts';

// ----------------------------------------------------------------------

export const tabs = [
  {
    value: 'subscriber-accounts',
    label: 'Subscriber accounts',
    icon: 'mdi:users',
  },
  {
    value: 'subscription-status',
    label: 'Subscription Status',
    icon: 'grommet-icons:status-unknown',
  },
];

interface Props {
  tab?: string;
}

export default function ManageSubscriberAccounts({ tab }: Props) {
  const { t } = useTranslate();
  const settings = useSettingsContext();

  const currentTab = useMemo(
    () =>
      typeof tab === 'string' && tabs.find((item) => item.value === tab)
        ? tab
        : 'subscriber-accounts',
    [tab]
  );

  const { createQueryString } = useQueryString();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    createQueryString([{ name: 'tab', value: newValue }], true);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{ width: 'fit-content', marginInline: 'auto' }}
      >
        {tabs.map((item) => (
          <Tab
            key={item.value}
            value={item.value}
            icon={typeof item.icon === 'string' ? <Iconify icon={item.icon} /> : item.icon}
            label={t(item.label)}
          />
        ))}
      </Tabs>

      <Box mt={3}>
        {currentTab === 'subscriber-accounts' && <SubscriberAccounts />}
        {currentTab === 'subscription-status' && <SubscriptionStatus />}
      </Box>
    </Container>
  );
}
