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
import { Sports } from 'src/types/subscription-packages';
import { useSnackbar } from 'src/components/snackbar';
import  FormProvider, { RHFTextField, RHFUploadAvatar } from 'src/components/hook-form';


// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  sport?: Sports;
};

export default function SportDialog({sport,  open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const addSportSchema = Yup.object().shape({
    nameAr: Yup.string(),
    nameEn: Yup.string(),
    photo:Yup.mixed<any>().nullable(),

  });
  const defaultValues = useMemo(
    () => ({
      nameAr: sport?.arabic_name ||'',
      nameEn: sport?.english_name || '',
      photo: sport?.image || '',
    }),
    [sport]
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

  useEffect(() => {
    reset({nameAr:sport?.arabic_name, nameEn:sport?.english_name, photo:sport?.image});
}, [sport?.arabic_name, sport?.english_name, sport?.image]);

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
      const file:any = acceptedFiles[0];
      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        setValue('photo', newFile, { shouldValidate: true });
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
        <DialogTitle>{sport ? t("Edit Sport"):t('Add Sport')}</DialogTitle>

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
                sx={{  '&': {gridColumnStart: {xs: 1, md: 3},gridColumnEnd: {xs: 3, md: 1}}}}
                maxSize={3145728}
                onDrop={handleDrop}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      width: '100%',
                      mx: 'auto',
                      "&": {
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
               <RHFTextField  name="nameAr" label={t('Arabic name')} />
            <RHFTextField name="nameEn" label={t('English name')} />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            { t('Cancel')}
          </Button>

          <LoadingButton color="primary" type="submit" variant="contained" loading={isSubmitting}>
            {sport ? t('Update') : t('Add')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
