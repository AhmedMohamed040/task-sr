import React from 'react';

import { Card, CardContent, Typography, Avatar, Box, Grid, Chip, IconButton } from '@mui/material';

import { useTranslate } from 'src/locales';

const CustomCard = () => {
  const { t } = useTranslate();

  return (
    <Card variant="outlined">
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Avatar
            src="path/to/north-face-logo.png"
            alt="The North Face"
            sx={{ width: 40, height: 40 }}
          />
        </Grid>
        <Grid item xs={10}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body1" component="div" sx={{ fontWeight: 'bold' }}>
              أكاديمية ليفربول
            </Typography>
            <IconButton size="small">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 20q-.825 0-1.412-.587T10 18t.588-1.412T12 16t1.413.588T14 18t-.587 1.413T12 20m0-6q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m0-6q-.825 0-1.412-.587T10 6t.588-1.412T12 4t1.413.588T14 6t-.587 1.413T12 8"
                />
              </svg>
            </IconButton>
          </Box>
          <Typography variant="body2" color="textSecondary" gutterBottom>
             {t("subscribed from")} : 12 Jul 2022 4:00 PM
          </Typography>
          <Box display="flex" alignItems="center">
            <Chip
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 16q-1.725 0-3.225.525T6 18v2h12v-2q-1.275-.95-2.775-1.475T12 16m-6 6q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h12q.825 0 1.413.588T20 4v16q0 .825-.587 1.413T18 22zm6-8q1.45 0 2.475-1.025T15.5 10.5t-1.025-2.475T12 7T9.525 8.025T8.5 10.5t1.025 2.475T12 14"
                  />
                </svg>
              }
              label={`255 ${t("subscriber")}`}
              size="small"
              color="success"
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path fill="currentColor" d="M16 20v-7h4v7zm-6 0V4h4v16zm-6 0V9h4v11z" />
            </svg>
            <Typography variant="body2" color="textSecondary" ml={1}>
              1 {t("year_exp")}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 18q2.5 0 4.25-1.75T18 12q0-2.175-1.388-3.825T13.1 6.1q-.45-.05-.775.25T12 7.1V12l-3.45 3.45q-.325.325-.3.775t.375.725q.725.575 1.6.813T12 18m0 4q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
              />
            </svg>
            <Typography variant="body2" color="textSecondary" ml={1}>
              {t("Full Time")}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M8.5 17V6H9q0-1.25.875-2.125T12 3t2.125.875T15 6h.5v11zm2-11h3q0-.65-.425-1.075T12 4.5t-1.075.425T10.5 6M17 17V6h1q.825 0 1.413.588T20 8v7q0 .825-.587 1.413T18 17zM6 17q-.825 0-1.412-.587T4 15V8q0-.825.588-1.412T6 6h1v11zm-4 4v-2h20v2z"
              />
            </svg>
            <Typography variant="body2" color="textSecondary" ml={1}>
              {t("Competitive")}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 12q-1.65 0-2.825-1.175T8 8t1.175-2.825T12 4t2.825 1.175T16 8t-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
              />
            </svg>
            <Typography variant="body2" color="textSecondary" ml={1}>
              {t("Manager")}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
  )
}

export default CustomCard;
