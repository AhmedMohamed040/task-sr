import { Controller, useFormContext } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { fDate } from 'src/utils/format-time';
// ----------------------------------------------------------------------

type Props =  {
  name: string;
  helperText?:string;
  label?:string;
  value?:string;
};

export default function RHFDate({ name,label,value, helperText }: Props) {
  const { control } = useFormContext();

  return (
    <Controller
    name={name}
    control={control}
    render={({ field, fieldState: { error } }) => (
      <DatePicker
      label={label}
        value={new Date(field.value)}
        onChange={(newValue) => {
       field.onChange(newValue);
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            error: !!error,
            helperText: error?.message,
          },
        }}
      />
    )}
  />
  );
}
