'use client';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import Container from '@mui/material/Container';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import CentersDialog from '../forms/centers-dialog';

import CentersSettingsTable from '../tabs-tables/centers-settings-table';

export default function CentersSettings() {
  const { t } = useTranslate();
  const settings = useSettingsContext();

  const formDialog = useBoolean();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        links={[{}]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={() => formDialog.onTrue()}
          >
            {t('add')}
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Card>
        <CentersSettingsTable />
      </Card>
      <CentersDialog open={formDialog.value} onClose={formDialog.onFalse} />
    </Container>
  );
}
