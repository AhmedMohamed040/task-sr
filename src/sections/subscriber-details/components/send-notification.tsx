import * as Yup from 'yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import LoadingButton from '@mui/lab/LoadingButton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

// import { Units } from 'src/@types/units';
import { useTranslate } from 'src/locales';
// import { addUnit, updateUnit } from 'src/actions/units-actions';

import { Grid } from '@mui/material';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

type Props = {
  open: boolean;
  onClose: VoidFunction;
  selectedEmail: string | undefined;
};

export default function SendNotification({ open, onClose, selectedEmail }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslate();

  const NewMessageSchema = Yup.object().shape({
    send_to: Yup.string().required(t('This field is required')),
    message_header: Yup.string().required(t('This field is required')),
    message_body: Yup.string().required(t('This field is required')),
  });

  const defaultValues = useMemo(
    () => ({
      send_to: selectedEmail || '',
      message_header: '',
      message_body: '',
    }),
    [selectedEmail]
  );

  const methods = useForm({
    resolver: yupResolver(NewMessageSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();
  const onSubmit = handleSubmit(async (data) => {
    const newMessage = {
      ...data,
      type: ['email'],
    };
    enqueueSnackbar(t('Send Successfully'));

    // const res = await sendMessage(newMessage);
    // if (res?.statusCode === 200) {
    //   enqueueSnackbar(t('Send Successfully'));
    // } else {
    //   enqueueSnackbar(`${res?.error}`, { variant: 'error' });
    // }
    onClose();
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
        <DialogTitle>{t('send notificaton')}</DialogTitle>
        <DialogContent>
          <Grid rowGap={2} mt={1} container columnSpacing={{ xs: 1, sm: 2 }}>
            <Grid item sm={4}>
              <RHFTextField name="message_header" label={t('Notification Header')} type="text" />
            </Grid>
            <Grid item sm={5}>
              <RHFTextField name="send_to" label={t('Send to')} type="text" />
            </Grid>
            <Grid item sm={3}>
              <Box
                sx={{
                  border: '1px solid #E9ECEE',
                  height: '53px',
                  display: 'flex',
                  borderRadius: '8px',
                  gap: 1,
                  p: '2px',
                }}
              >
                <Button
                  sx={{
                    flexGrow: 1,
                    color: 'gray',
                    borderRadius: '6px',
                    border: '1px solid rgba(145, 158, 171, 0.6)',
                  }}
                >
                  Email
                </Button>
                <Button
                  sx={{
                    flexGrow: 1,
                    borderRadius: '6px',
                    color: '#00A76F',
                    background: 'rgba(0, 167, 111, 0.08)',
                  }}
                >
                  Portal
                </Button>
              </Box>
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
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            {t('cancel')}
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {t('send')}
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
