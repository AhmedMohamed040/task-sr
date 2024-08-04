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
import FormProvider, { RHFAutocomplete, RHFSwitch, RHFTextField, RHFUploadAvatar, RHFDate, RHFRadioGroup } from 'src/components/hook-form';
import { ITicket } from 'src/types/support';


// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  onClose: VoidFunction;
  ticket?: ITicket;
};
const _tags: string[] = [
  "Family account",
  "Coaches application",
  "News and publications",
  "Moment",
  "Electronic payment",
  "users number",
];
export default function TicketDialog({ ticket, open, onClose }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const addSportSchema = Yup.object().shape({
    status: Yup.string().required('status is required'),

  });
  const defaultValues = useMemo(
    () => ({
      status: ticket?.status || "OPEN",
    }),
    [ticket]
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
      status: ticket?.status
    });
  }, [ticket?.status]);
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
        <DialogTitle>{t("Edit Package")}</DialogTitle>

        <DialogContent>


          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns="1fr"
            sx={{ mt: 1 }}
          >


            <RHFRadioGroup
                row
                name="status"
                options={[
                  { value: 'RESOLVED', label: t('Resolved') },
                  { value: 'OPEN', label: t('Open') },
                  { value: 'IN_PROGRESS', label: t('In progress') },
                  { value: 'CLOSED', label: t('Closed') },
                  { value: 'CANCELLED', label: t('Cancelled') },

                ]}
              />

          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t('Cancel')}
          </Button>

          <LoadingButton color="primary" type="submit" variant="contained" loading={isSubmitting}>
            {t('Update')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
