'use client';

import { t } from 'i18next';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import Container from '@mui/material/Container';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import StandardsManagementDialog from '../forms/standards-managment';

import StandardsManagementTable from '../tabs-tables/standards-management-table';

export default function StandardsManagement() {
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
        <StandardsManagementTable />
      </Card>
      <StandardsManagementDialog
        open={quickAdd.value}
        onClose={quickAdd.onFalse}
        item={undefined}
      />
    </Container>
  );
}
