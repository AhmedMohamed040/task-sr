'use client';

import { useMemo } from 'react';

import { Tab, Tabs, Container, Box, Grid } from '@mui/material';

import { useQueryString } from 'src/hooks/use-queryString';

import { useTranslate } from 'src/locales';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import Profits from './components/Profits';
import BestSellers from './components/BestSellers';
import AcademyCard from './components/AcademyCard';
import Expensesprofits from './components/Expensesprofits';

// ----------------------------------------------------------------------
const _icon = (
  <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.75 0.25C13.1284 0.24988 13.4929 0.392805 13.7704 0.650123C14.0479 0.907441 14.2179 1.26013 14.2463 1.6375L14.25 1.75V12.25C14.2501 12.6284 14.1072 12.9929 13.8499 13.2704C13.5926 13.5479 13.2399 13.7179 12.8625 13.7463L12.75 13.75H2.25C1.87157 13.7501 1.50708 13.6072 1.22959 13.3499C0.952103 13.0926 0.782133 12.7399 0.75375 12.3625L0.75 12.25V1.75C0.74988 1.37157 0.892805 1.00708 1.15012 0.729589C1.40744 0.452103 1.76013 0.282133 2.1375 0.25375L2.25 0.25H12.75ZM12.75 1.75H2.25V12.25H12.75V1.75ZM4.5 3.25C4.6837 3.25002 4.861 3.31747 4.99828 3.43954C5.13556 3.56161 5.22326 3.72981 5.24475 3.91225L5.25 4V10C5.24979 10.1912 5.17659 10.375 5.04536 10.514C4.91414 10.653 4.73479 10.7367 4.54395 10.7479C4.35312 10.7591 4.16522 10.697 4.01863 10.5743C3.87204 10.4516 3.77783 10.2776 3.75525 10.0878L3.75 10V4C3.75 3.80109 3.82902 3.61032 3.96967 3.46967C4.11032 3.32902 4.30109 3.25 4.5 3.25ZM7.5 3.25C7.69891 3.25 7.88968 3.32902 8.03033 3.46967C8.17098 3.61032 8.25 3.80109 8.25 4V10C8.25 10.1989 8.17098 10.3897 8.03033 10.5303C7.88968 10.671 7.69891 10.75 7.5 10.75C7.30109 10.75 7.11032 10.671 6.96967 10.5303C6.82902 10.3897 6.75 10.1989 6.75 10V4C6.75 3.80109 6.82902 3.61032 6.96967 3.46967C7.11032 3.32902 7.30109 3.25 7.5 3.25ZM10.5 3.25C10.6837 3.25002 10.861 3.31747 10.9983 3.43954C11.1356 3.56161 11.2233 3.72981 11.2448 3.91225L11.25 4V10C11.2498 10.1912 11.1766 10.375 11.0454 10.514C10.9141 10.653 10.7348 10.7367 10.544 10.7479C10.3531 10.7591 10.1652 10.697 10.0186 10.5743C9.87204 10.4516 9.77783 10.2776 9.75525 10.0878L9.75 10V4C9.75 3.80109 9.82902 3.61032 9.96967 3.46967C10.1103 3.32902 10.3011 3.25 10.5 3.25Z"
      fill="currentColor"
    />
  </svg>
);
const _ecommerceSalesOverview = [
  'اكاديمية العربي الصغير',
  'اكاديمية ابن راشد',
  'اكاديمية ابو صلاح',
].map((label, index) => ({
  label,
  totalAmount: 100,
  value: 10,
}));

export const tabs = [
  {
    value: 'sports-services',
    label: 'Sports Services',
    icon: 'mingcute:download-3-fill',
  },
  {
    value: 'standards-management',
    label: 'Standards Management',
    icon: 'solar:hamburger-menu-bold',
  },
  {
    value: 'centers-settings',
    label: 'Centers Settings',
    icon: 'octicon:filter-16',
  },
  {
    value: 'job-roles',
    label: 'Job Roles',
    icon: _icon,
  },
  {
    value: 'terms-and-conditions',
    label: 'Terms and Conditions',
    icon: _icon,
  },
  {
    value: 'about-plantform',
    label: 'About Plantform',
    icon: _icon,
  },
];

interface Props {
  tab?: string;
}

export default function ReportsStatistics({ tab }: Props) {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Reports and Statistics"
        links={[{}]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={6}>
                  <Expensesprofits
                    title="profits"
                    total={18765}
                    percent={2.6}
                    bgColor="#d9f6e8"
                    lineColor="#288f7f"
                    chart={{
                      series: [
                        { x: 2016, y: 111 },
                        { x: 2017, y: 136 },
                        { x: 2018, y: 76 },
                        { x: 2019, y: 108 },
                        { x: 2020, y: 74 },
                        { x: 2021, y: 54 },
                        { x: 2022, y: 57 },
                        { x: 2023, y: 84 },
                      ],
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Expensesprofits
                    title="expenses"
                    total={18765}
                    bgColor="#fff4da"
                    percent={2.6}
                    lineColor="#ffb214"
                    chart={{
                      series: [
                        { x: 2016, y: 111 },
                        { x: 2017, y: 136 },
                        { x: 2018, y: 76 },
                        { x: 2019, y: 108 },
                        { x: 2020, y: 74 },
                        { x: 2021, y: 54 },
                        { x: 2022, y: 57 },
                        { x: 2023, y: 84 },
                      ],
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <BestSellers title="Most profitable academies" data={_ecommerceSalesOverview} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={4}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Profits
                title="Annual profits"
                percent={2.6}
                total={765}
                type="bar"
                chart={{
                  series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Profits
                title="Monthly profits"
                percent={2.6}
                total={765}
                type="line"
                chart={{
                  series: [22, 8, 35, 50, 82, 84, 77, 12, 87, 43],
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <AcademyCard  />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
