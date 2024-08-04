import * as Yup from 'yup';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fData } from 'src/utils/format-number';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';
import { IStandardsManagment } from 'src/types/subscription-packages';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  item: IStandardsManagment | undefined;
};

export default function StandardsManagementDialog({ open, onClose, item }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const addStandardSchema = Yup.object().shape({
    sport_name_ar: Yup.string(),
    sport_name_en: Yup.string(),
    standard_name_ar: Yup.string(),
    standard_name_en: Yup.string(),
    photo: Yup.mixed<any>().nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      sport_name_ar: item?.arabic_name || '',
      sport_name_en: item?.english_name || '',
      standard_name_ar: item?.arabic_name || '',
      standard_name_en: item?.english_name || '',
      photo: item?.image || null,
    }),
    [item?.arabic_name, item?.english_name, item?.image]
  );

  const methods = useForm({
    resolver: yupResolver(addStandardSchema),
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
      console.log(data);
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
        setValue('photo', newFile, { shouldValidate: true });
      }
    },
    [setValue]
  );

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

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
        <DialogTitle> {item ? t('edit_standard') : t('add_standard')}</DialogTitle>

        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
            sx={{ mt: 1 }}
          >
            <RHFUploadAvatar
              name="photo"
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
            <br />
            <RHFTextField name="sport_name_ar" label={t('sport_arabic_name')} />
            <RHFTextField name="sport_name_en" label={t('sport_english_name')} />
            <RHFTextField name="standard_name_ar" label={t('arabic_measurement')} />
            <RHFTextField name="standard_name_en" label={t('english_measurement')} />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t('Cancel')}
          </Button>

          <LoadingButton color="primary" type="submit" variant="contained" loading={isSubmitting}>
            {item ? t('Edit') : t('Add')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
