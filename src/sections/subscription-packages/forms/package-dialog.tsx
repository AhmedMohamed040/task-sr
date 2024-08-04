import * as Yup from 'yup';
import { t } from 'i18next';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { fData } from 'src/utils/format-number';
import Box from '@mui/material/Box';
import { Button, Chip } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Typography } from '@mui/material';
import { ISubscription } from 'src/types/subscriber';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFAutocomplete, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFDate } from 'src/components/hook-form';


// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  subscribePackage?: ISubscription;
};
const _tags: string[] = [
  "Family account",
  "Coaches application",
  "News and publications",
  "Moment",
  "Electronic payment",
  "users number",
];
export default function PackageDialog({ subscribePackage, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const addSportSchema = Yup.object().shape({
    name: Yup.string(),
    price: Yup.number().moreThan(0, t('Price should not be $0.00')),
    startDate: Yup.mixed<any>().nullable().required(t('Create date is required')),
    endDate: Yup.mixed<any>()
      .required('Due date is required')
      .test(
        'date-min',
        t('Due date must be later than create date'),
        (value, { parent }) => value.getTime() > parent.startDate.getTime()
      ),
    status: Yup.boolean(),

    photo: Yup.mixed<any>().nullable(),
    functions: Yup.mixed(),
    duration_for_days: Yup.number(),

  });
  const defaultValues = useMemo(
    () => ({
      name: subscribePackage?.name || '',
      price: subscribePackage?.price || 0,
      status: subscribePackage?.status || false,
      functions: subscribePackage?.functions || [],
      duration_for_days: subscribePackage?.duration_for_days || 7,
      startDate: subscribePackage?.startDate || '',
      endDate: subscribePackage?.endDate || '',
      photo: subscribePackage?.image || '',
    }),
    [subscribePackage]
  );

  const methods = useForm({
    resolver: yupResolver(addSportSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    getValues,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;
  const formValues = watch();
  useEffect(() => {
    reset({
      name: subscribePackage?.name, photo: subscribePackage?.image, startDate: subscribePackage?.startDate
      , endDate: subscribePackage?.endDate, price: subscribePackage?.price
    });
  }, [subscribePackage?.name, subscribePackage?.endDate, subscribePackage?.startDate, subscribePackage?.image, subscribePackage?.price]);
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
        <DialogTitle>{subscribePackage ? t("Edit Package") : t('Add Package')}</DialogTitle>

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
            <RHFTextField name="name" label={t('Name')} />

            <RHFTextField
              name="price"

              label={t("Price")}
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      $
                    </Box>
                  </InputAdornment>
                ),
              }}
            />

            <RHFTextField
              name="duration_for_days"

              label={t("Duration for days")}
              placeholder="0"
              type="number"
              InputLabelProps={{ shrink: true }}
            />


            <RHFSwitch
              checked={getValues('status')}
              name="is_active"
              /*   labelPlacement="start" */
              label={
                <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                  {t('Active')}
                </Typography>
              }
              inputProps={{
                'aria-labelledby': `${t('Active')}`,
              }}
            />

            <Typography variant="overline">
              {t('The date of the emergence of the package')}
            </Typography>
            <br />
            <RHFDate name="startDate" label={t("From")} />
            <RHFDate name="endDate" label={t("To")} />

            <Typography variant="overline">
              {t('Package functions from the platform')}
            </Typography>
            <RHFAutocomplete
              name="functions"
              /* label={`${t("Platform functions")}`} */
              sx={{ gridColumn: '1 / span 2' }}
              placeholder={`${t("Platform functions")}`}
              multiple
              freeSolo
              options={_tags.map((option) => t(option))}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                    color="info"
                    variant="soft"
                  />
                ))
              }
            />
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t('Cancel')}
          </Button>

          <LoadingButton color="primary" type="submit" variant="contained" loading={isSubmitting}>
            {subscribePackage ? t('Update') : t('Add')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
