'use client';

import { useMemo } from 'react';

import { Tab, Tabs, Container, Box, Card, Button } from '@mui/material';

import { useQueryString } from 'src/hooks/use-queryString';

import { useTranslate } from 'src/locales';
import SubscriptionTable from './tables/subscriptions-table';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useBoolean } from 'src/hooks/use-boolean';
import PackageDialog from './forms/package-dialog';

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
  data?: any;
}

export default function SubscriptionPackages({ data }: Props) {
  const { t } = useTranslate();
  const settings = useSettingsContext();
  const quickAdd =  useBoolean();
  const { createQueryString } = useQueryString();



  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
       <CustomBreadcrumbs

        heading={t('Previous packages')}
        links={[
          { name: '' },

        ]}
        action={
          <Button

            onClick={quickAdd.onTrue}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            {t('add')}
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Card>

    <SubscriptionTable />
      </Card>

        <PackageDialog open={quickAdd.value} onClose={quickAdd.onFalse} />
    </Container>
  );
}
