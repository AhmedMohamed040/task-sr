import { ApexOptions } from 'apexcharts';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { CardProps } from '@mui/material/Card';
import { alpha, useTheme } from '@mui/material/styles';

import { fPercent, fCurrency } from 'src/utils/format-number';

import { bgGradient } from 'src/theme/css';
import { ColorSchema } from 'src/theme/palette';

import Iconify from 'src/components/iconify';
import Chart, { useChart } from 'src/components/chart';
import { useTranslate } from 'src/locales';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  total: number;
  title: string;
  percent: number;
  color?: ColorSchema;
  chart: {
    colors?: string[];
    series: {
      x: number;
      y: number;
    }[];
    options?: ApexOptions;
  };
  bgColor?: string;
  lineColor?: string;
}

export default function Expensesprofits({
  title,
  total,
  percent,
  color = 'primary',
  chart,
  sx,
  bgColor,
  lineColor,
  ...other
}: Props) {
  const theme = useTheme();
  const { t } = useTranslate();

  const {
    colors = [theme.palette[color].main, theme.palette[color].dark],
    series,
    options,
  } = chart;

  const chartOptions = useChart({
    colors: [lineColor || colors[1]],
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: bgColor || colors[0], opacity: 1 },
          { offset: 100, color: bgColor || colors[1], opacity: 1 },
        ],
      },
    },
    chart: {
      sparkline: {
        enabled: true,
      },
      background: bgColor || theme.palette.background.default,
    },
    xaxis: {
      labels: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        show: false,
      },
    },
    stroke: {
      width: 4,
    },
    legend: {
      show: false,
    },
    grid: {
      show: false,
    },
    tooltip: {
      marker: {
        show: false,
      },
      y: {
        formatter: (value: number) => fCurrency(value),
        title: {
          formatter: () => '',
        },
      },
    },
    ...options,
  });

  return (
    <Stack
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: bgColor ? alpha(bgColor, 0.2) : alpha(theme.palette[color].light, 0.2),
          endColor: bgColor ? alpha(bgColor, 0.2) : alpha(theme.palette[color].main, 0.2),
        }),
        p: 3,
        borderRadius: 2,
        color: `${color}.darker`,
        backgroundColor: bgColor,
        ...sx,
      }}
      {...other}
    >
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <div>
          <Box sx={{ mb: 1, typography: 'subtitle2' }}>{t(title)}</Box>
          <Box sx={{ typography: 'h3' }}>{fCurrency(total)}</Box>
        </div>

        <div>
          <Stack spacing={0.5} direction="row" alignItems="center" justifyContent="flex-end">
            <Iconify icon={percent >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />
            <Box sx={{ typography: 'subtitle2' }}>
              {percent > 0 && '+'}
              {fPercent(percent)}
            </Box>
          </Stack>
          <Box sx={{ mt: 0.5, opacity: 0.8, typography: 'body2' }}>{t('than_last_month')}</Box>
        </div>
      </Stack>
      <Chart
        dir="ltr"
        type="area"
        series={[{ data: series }]}
        options={chartOptions}
        width="100%"
        height={118}
      />
    </Stack>
  );
}
