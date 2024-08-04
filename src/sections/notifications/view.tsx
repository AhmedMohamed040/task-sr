'use client';

import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Card, Grid, Button, Container } from '@mui/material';

import { useTranslate } from 'src/locales';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FormProvider from 'src/components/hook-form/form-provider';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';

// Mock data for centers
const centers = [
  { id: '1', name: 'Center A' },
  { id: '2', name: 'Center B' },
  { id: '3', name: 'Center C' },
];

export default function Notifications() {
  const { t } = useTranslate();
  const settings = useSettingsContext();

  const NewMessageSchemaForAll = Yup.object().shape({
    message_header: Yup.string().required(t('This field is required')),
    message_body: Yup.string().required(t('This field is required')),
  });

  const defaultValuesForAll = useMemo(
    () => ({
      message_header: '',
      message_body: '',
    }),
    []
  );

  const methodsForAll = useForm({
    resolver: yupResolver(NewMessageSchemaForAll),
    defaultValues: defaultValuesForAll,
  });

  const {
    handleSubmit: handleSubmitForAll,
    reset: resetForAll,
    formState: { isSubmitting: isSubmittingForAll },
  } = methodsForAll;

  const onSubmitForAll = handleSubmitForAll(async (data) => {
    console.log('Submitted data for all centers:', data);
  });

  const handleCancelForAll = () => {
    resetForAll();
  };

  const NewMessageSchemaForOne = Yup.object().shape({
    center: Yup.string().required(t('Please select a center')),
    message_header: Yup.string().required(t('This field is required')),
    message_body: Yup.string().required(t('This field is required')),
  });

  const defaultValuesForOne = useMemo(
    () => ({
      center: '',
      message_header: '',
      message_body: '',
    }),
    []
  );

  const methodsForOne = useForm({
    resolver: yupResolver(NewMessageSchemaForOne),
    defaultValues: defaultValuesForOne,
  });

  const {
    handleSubmit: handleSubmitForOne,
    reset: resetForOne,
    formState: { isSubmitting: isSubmittingForOne },
  } = methodsForOne;

  const onSubmitForOne = handleSubmitForOne(async (data) => {
    console.log('Submitted data for one center:', data);
  });

  const handleCancelForOne = () => {
    resetForOne();
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading={t('Notifications for all sports centers')}
        links={[{ name: '' }]}
        sx={{
          mb: { xs: 3, md: 1 },
        }}
      />
      <Card sx={{ p: 2, mb: 4 }}>
        <FormProvider methods={methodsForAll} onSubmit={onSubmitForAll}>
          <Grid rowGap={2} mt={1} container columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item sm={4}>
              <RHFTextField name="message_header" label={t('Notification Header')} type="text" />
            </Grid>

            <Grid item sm={12}>
              <RHFTextField
                multiline
                rows={4}
                maxRows={4}
                type="text"
                name="message_body"
                label={t('Notification Body')}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              <LoadingButton type="submit" variant="contained" loading={isSubmittingForAll}>
                {t('send')}
              </LoadingButton>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleCancelForAll}>
                {t('cancel')}
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>

      <CustomBreadcrumbs
        heading={t('Notifications for a specific center')}
        links={[{ name: '' }]}
        sx={{
          mb: { xs: 3, md: 1 },
        }}
      />
      <Card sx={{ p: 2 }}>
        <FormProvider methods={methodsForOne} onSubmit={onSubmitForOne}>
          <Grid rowGap={2} mt={1} container columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item sm={4}>
              <RHFSelect name="center" label={t('Select a center')}>
                <option value="" disabled>
                  {t('Select a center')}
                </option>
                {centers.map((center) => (
                  <option key={center.id} value={center.id}>
                    {center.name}
                  </option>
                ))}
              </RHFSelect>
            </Grid>
            <Grid item sm={4}>
              <RHFTextField name="message_header" label={t('Notification Header')} type="text" />
            </Grid>
            <Grid item sm={12}>
              <RHFTextField
                multiline
                rows={4}
                maxRows={4}
                type="text"
                name="message_body"
                label={t('Notification Body')}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              <LoadingButton type="submit" variant="contained" loading={isSubmittingForOne}>
                {t('send')}
              </LoadingButton>
            </Grid>
            <Grid item>
              <Button variant="outlined" onClick={handleCancelForOne}>
                {t('cancel')}
              </Button>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </Container>
  );
}
