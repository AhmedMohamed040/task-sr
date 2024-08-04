'use client';

import Card from '@mui/material/Card';
import { Container } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';

import SubscriptionStatusTable from '../tables/subscription-status-table';





export default function SportsServies() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <SubscriptionStatusTable />
      </Card>
    </Container>
  );
}
