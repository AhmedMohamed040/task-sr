'use client';

import { useMemo, useState } from 'react';

import { t } from 'i18next';
import { useSnackbar } from 'notistack';
import Iconify from 'src/components/iconify';
import { Tab, Tabs, Box } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import LoadingButton from '@mui/lab/LoadingButton';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSettingsContext } from 'src/components/settings';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';

import SportDialog from '../forms/sport-dialog';

export default function AboutPlatform() {
  const settings = useSettingsContext();

  const quickAdd = useBoolean();
  const [tabsLang, setTabsLang] = useState('ar');

  const filters = useMemo(() => ({ name: '' }), []);

  const { enqueueSnackbar } = useSnackbar();
  const addSportSchema = Yup.object().shape({
    ar: Yup.string(),
    en: Yup.string(),
  });
  const defaultValues = useMemo(
    () => ({
      ar: '',
      en: '',
    }),
    []
  );
  const methods = useForm({
    resolver: yupResolver(addSportSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const tabs = [
    {
      value: 'ar',
      label: t('Arabic'),
      icon: 'mdi:abjad-arabic',
    },
    {
      value: 'en',
      label: t('English'),
      icon: 'uil:letter-english-a',
    },
  ];
  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      reset();
    } catch (error) {
      enqueueSnackbar('Something wrong!', { variant: 'error' });
      console.error(error);
    }
  });

  const handleChangeTab = (event: React.SyntheticEvent, value: any) => {
    setTabsLang(value);
    console.log(value, 'here');
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <CustomBreadcrumbs
          links={[{}]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Tabs
            textColor="primary"
            value={tabsLang}
            onChange={handleChangeTab}
            aria-label="icon position tabs"
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
        </Box>
        <Box mt={3}>
          <Card sx={{ p: 2 }}>
            {tabsLang === 'ar' && <RHFTextField name="ar" multiline rows={12} />}

            {tabsLang === 'en' && <RHFTextField name="en" multiline rows={12} />}

            <Box mt={3}>
              <LoadingButton
                color="primary"
                type="submit"
                variant="contained"
                loading={isSubmitting}
              >
                {t('Save')}
              </LoadingButton>
            </Box>
          </Card>
        </Box>
      </FormProvider>
    </Container>
  );
}
