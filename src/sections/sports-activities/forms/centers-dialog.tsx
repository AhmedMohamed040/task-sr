import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useMemo, useCallback } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { Grid, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { fData } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';

import { ICenterSettings } from 'src/types/subscription-packages';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  center?: ICenterSettings;
};

export default function CentersDialog({ open, onClose, center }: Props) {
  const { t } = useTranslate();
  const { enqueueSnackbar } = useSnackbar();

  const schema = Yup.object().shape({
    center_type_ar: Yup.string().required(t('This field is required')),
    center_type_en: Yup.string().required(t('This field is required')),
    image: Yup.mixed<any>().required(t('This field is required')),
  });

  const defaultValues = useMemo(
    () => ({
      center_type_ar: center?.center_type_ar || '',
      center_type_en: center?.center_type_en || '',
      image: center?.image || undefined,
    }),
    [center?.center_type_ar, center?.center_type_en, center?.image]
  );

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (center) {
        console.log(`edit center ${center.id}`, data);
      } else {
        console.log('add center', data);
      }
      reset();
      onClose();
    } catch (error) {
      enqueueSnackbar('Something wrong!', { variant: 'error' });
      console.error(error);
    }
  });
  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file: any = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('image', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );
  return (
    <Dialog
      fullWidth
      maxWidth={false}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { maxWidth: 720 },
      }}
    >
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{t('Add Sport')}</DialogTitle>

        <DialogContent>
          <Grid container rowSpacing={3} columnSpacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <RHFUploadAvatar
                name="image"
                sx={{ '&': { gridColumnStart: { xs: 1, md: 3 }, gridColumnEnd: { xs: 3, md: 1 } } }}
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      width: '100%',
                      mx: 'auto',
                      '&': {
                        display: 'grid',
                      },
                      gridColumn: 'span 3',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <RHFTextField name="center_type_ar" label={t('center_arabic_type')} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <RHFTextField name="center_type_en" label={t('center_english_type')} />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t('Cancel')}
          </Button>

          <LoadingButton color="primary" type="submit" variant="contained" loading={isSubmitting}>
            {t(center ? 'Update' : 'Add')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
