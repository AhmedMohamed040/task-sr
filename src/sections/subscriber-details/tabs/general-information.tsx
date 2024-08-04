'use client';

import { Box, Card, Container, Typography } from '@mui/material';
import Label from 'src/components/label';
import { GoogleMap } from 'src/components/map';

import { useSettingsContext } from 'src/components/settings';
import { useTranslate } from 'src/locales';
import { fDate } from 'src/utils/format-time';

export default function GeneralInformation() {
  const settings = useSettingsContext();
  const { t } = useTranslate();
  const details = {
    commercialRegistrationNumber: 'INV_42',
    address: 'أبراج الرياض مكة',
    phone: '0096555557158',
    subscriptionStartsIn: '2024-5-20',
    subscriptionEndsIn: '2025-5-20',
    workingDays: [
      'من 8ص ل 8م',
      'من10ص ل 10م',
      'من10ص ل 10م',
      'أجازه',
      'من10ص ل 10م',
      'أجازه',
      'من9ص ل 9م',
    ],
    location: '',
    numberOfBranches: 5,
    latitude: 38.04231,
    longitude: -78.47167,
  };

  const Days = ['SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography variant="h4">{t('GENERAL_INFORMATION')}</Typography>
      <Card
        sx={{ display: 'flex', flexDirection: 'column', gap: 3, paddingBlock: 3, paddingInline: 1 }}
      >
        <Box sx={{ display: 'flex', gap: 40 }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '200px' }}
          >
            <Typography variant="subtitle1">
              <Label variant="soft" color={'success'}>
                {t('COMMERCIAL_REGISTRATION_NUMBER')}
              </Label>
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'end', flexGrow: 1, mr: 5 }}>
              {details.commercialRegistrationNumber}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {t('ADDRESS')}
            </Typography>

            <Typography variant="body1">{details.address}</Typography>
          </Box>
        </Box>
        {/* ------------------------------------------------------------------------ */}
        <Box sx={{ display: 'flex', gap: 40 }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '200px' }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {t('SUBSCRIPTION_START_DATE')}
            </Typography>
            <Typography variant="body1">
              {fDate(details?.subscriptionStartsIn, 'dd-MM-yyyy')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {t('SUBSCRIPTION_END_DATE')}
            </Typography>

            <Typography variant="body1">
              {fDate(details?.subscriptionEndsIn, 'dd-MM-yyyy')}
            </Typography>
          </Box>
        </Box>
        {/* ------------------------------------------------------------------------ */}
        <Box sx={{ display: 'flex', gap: 40 }}>
          <Box
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', width: '200px' }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {t('WORKING_DAYS')}
            </Typography>

            {Days.map((day, index) => {
              return (
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'start',
                    width: '200px',
                    my: '3px',
                  }}
                >
                  <Typography variant="subtitle1">
                    <span style={{ fontWeight: 'bold' }}>{t(day)} : </span>
                    <span>{details.workingDays[index]}</span>
                  </Typography>
                </Box>
              );
            })}
          </Box>

          <Box
            height="20rem"
            width="20rem"
            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              {t('LOCATION')}
            </Typography>
            <GoogleMap
              staticPosition
              defaultPosition={{ lat: details.latitude, lng: details.longitude }}
              defaultZoom={15}
            />
          </Box>
        </Box>

        {/* ------------------------------------------------------------------------ */}

        <Box></Box>
      </Card>
    </Container>
  );
}
