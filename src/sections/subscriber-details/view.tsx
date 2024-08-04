'use client';

import { useMemo, useState } from 'react';

import {
  Tab,
  Box,
  Tabs,
  Button,
  useTheme,
  Container,
  ListItemText,
  Typography,
} from '@mui/material';

import { useQueryString } from 'src/hooks/use-queryString';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import Players from './tabs/players';
import Employees from './tabs/employees';
import SportsActivities from './tabs/sports-activities';
import GeneralInformation from './tabs/general-information';
import SendNotification from './components/send-notification';
import Image from 'next/image';

// ----------------------------------------------------------------------

export const tabs = [
  {
    value: 'general-information',
    label: 'General information',
    icon: 'material-symbols-light:id-card',
  },
  {
    value: 'sports-activities',
    label: 'Sports activities',
    icon: 'f7:sportscourt-fill',
  },
  {
    value: 'employees',
    label: 'Employees',
    icon: 'clarity:employee-group-solid',
  },
  {
    value: 'players',
    label: 'Players',
    icon: 'icon-park-solid:sport',
  },
];

interface Props {
  tab?: string;
}

export default function SubscriberDetails({ tab }: Props) {
  const { t } = useTranslate();
  const settings = useSettingsContext();
  const theme = useTheme();

  const currentTab = useMemo(
    () =>
      typeof tab === 'string' && tabs.find((item) => item.value === tab)
        ? tab
        : 'general-information',
    [tab]
  );

  const [showSendNotification, setShowSendNotification] = useState<boolean | undefined>(false);

  const { createQueryString } = useQueryString();

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    createQueryString([{ name: 'tab', value: newValue }], true);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Box
        sx={{
          backgroundImage: "url('/assets/images/bg.jpeg')",
          width: '100%',
          height: '250px',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '100% 100%',
          my: 2,
          boxShadow: 'inset 0 0 0 2000px rgba(14, 84, 77, 0.5)',
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          padding: '20px',
          gap: 4,
        }}
      >
        <Image
          alt="academy avatar"
          src="https://th.bing.com/th/id/OIP.MMdeMDupE_EyoMcz8XgX7wAAAA?w=183&h=183&rs=1&pid=ImgDetMain"
          width={150}
          height={150}
          style={{ borderRadius: '100%' }}
        />
        <ListItemText
          primary="أكاديمية أبو ناصر"
          secondary={
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1">أبو ناصر للأنشطة الرياضية </Typography>
              <Typography variant="body1">السجل التجاري</Typography>
            </Box>
          }
          primaryTypographyProps={{ typography: 'h3', color: 'white' }}
          secondaryTypographyProps={{ component: 'span', mt: 0.5, color: '#fff8'}}
        />
      </Box>

      <Box sx={{ display: 'flex', gap: 4 }}>
        <Tabs value={currentTab} onChange={handleChangeTab}>
          {tabs.map((item) => (
            <Tab
              key={item.value}
              value={item.value}
              icon={typeof item.icon === 'string' ? <Iconify icon={item.icon} /> : item.icon}
              label={t(item.label)}
            />
          ))}
        </Tabs>
        <Button
          onClick={() => {
            setShowSendNotification(true);
          }}
          variant="contained"
          startIcon={<Iconify icon="tabler:message-up" />}
        >
          {t('Send Notification')}
        </Button>
      </Box>

      <Box mt={3}>
        {currentTab === 'general-information' && <GeneralInformation />}
        {currentTab === 'employees' && <Employees />}
        {currentTab === 'players' && <Players />}
        {currentTab === 'sports-activities' && <SportsActivities />}
      </Box>

      {showSendNotification && (
        <SendNotification
          open={showSendNotification}
          onClose={() => {
            setShowSendNotification(false);
            // setSelectedEmail(undefined);
          }}
          selectedEmail="test@gmail.com"
        />
      )}
    </Container>
  );
}
