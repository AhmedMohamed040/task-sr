import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Card, { CardProps } from '@mui/material/Card';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';

import { fPercent, fCurrency } from 'src/utils/format-number';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

type ItemProps = {
  label: string;
  value: number;
  totalAmount: number;
};

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  data: ItemProps[];
}

export default function BestSellers({ title, subheader, data, ...other }: Props) {
  const { t } = useTranslate();

  return (
    <Card {...other}>
      <CardHeader title={t(title || '')} subheader={subheader} />

      <Stack spacing={4} sx={{ px: 3, pt: 3, pb: 5 }}>
        {data.map((progress, index) => (
          <ProgressItem key={progress.label} progress={progress} index={index} />
        ))}
      </Stack>
    </Card>
  );
}

// ----------------------------------------------------------------------

type ProgressItemProps = {
  progress: ItemProps;
  index: number;
};

function ProgressItem({ progress, index }: ProgressItemProps) {
  const getColorByIndex = (i: number): LinearProgressProps['color'] => {
    // Define a list of colors that are valid for LinearProgress
    const colors: LinearProgressProps['color'][] = ['primary', 'info', 'warning', 'error', 'success'];
    return colors[i % colors.length];
  };

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center">
        <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
          {progress.label}
        </Typography>

        <Typography variant="subtitle2">{fCurrency(progress.totalAmount)}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          &nbsp;({fPercent(progress.value)})
        </Typography>
      </Stack>

      <LinearProgress
        variant="determinate"
        value={progress.value}
        color={getColorByIndex(index)}
      />
    </Stack>
  );
}
