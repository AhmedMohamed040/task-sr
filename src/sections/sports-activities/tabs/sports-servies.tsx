'use client';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import Container from '@mui/material/Container';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import SportDialog from '../forms/sport-dialog';

import SportServicesTables from '../tabs-tables/sport-services-table';

export default function SportsServies() {
  const { t } = useTranslate();
  const settings = useSettingsContext();
  const quickAdd = useBoolean();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        links={[{}]}
        action={
          <Button
            onClick={quickAdd.onTrue}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            {t('add')}
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Card>
        <SportServicesTables />
      </Card>
      <SportDialog open={quickAdd.value} onClose={quickAdd.onFalse} />
    </Container>
  );
}
