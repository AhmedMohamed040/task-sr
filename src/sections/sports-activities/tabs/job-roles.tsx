'use client';

import { useState } from 'react';

import { t } from 'i18next';
import Iconify from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import Avatar from '@mui/material/Avatar';
import { useSettingsContext } from 'src/components/settings';
import { ConfirmDialog } from 'src/components/custom-dialog';
import SharedTable from 'src/CustomSharedComponents/SharedTable/SharedTable';
import { IJobRole } from 'src/types/subscription-packages';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import JobRolesDialog from '../forms/job-roles';

const rolesData = [
  {
    image: '/assets/images/about/hero.jpg',
    arabic_job_type: 'كرة القدم',
    english_job_type: 'Football',
    id: '1',
  },
  {
    image: '/assets/images/about/hero.jpg',
    arabic_job_type: 'كرة القدم',
    english_job_type: 'Football',
    id: '2',
  },
  {
    image: '/assets/images/about/hero.jpg',
    arabic_job_type: 'كرة القدم',
    english_job_type: 'Football',
    id: '3',
  },
];

const TABLE_HEAD = [
  { id: 'image', label: 'image' },
  { id: 'arabic_job_type', label: 'arabic_job_type' },
  { id: 'english_job_type', label: 'english_job_type' },
  { id: '' },
];

export default function JobRoles() {
  const settings = useSettingsContext();

  const [selectedStandard, setSelectedStandard] = useState<IJobRole | undefined>(undefined);

  const confirm = useBoolean();
  const quickAdd = useBoolean();

  const handleConfirmDelete = async () => {
    confirm.onFalse();
  };

  const handleOpen = (operation: string, standard: IJobRole | undefined) => {
    console.log(operation, standard);
    if (operation === 'edit') {
      setSelectedStandard(standard);
    } else {
      setSelectedStandard(undefined);
    }
    quickAdd.onTrue();
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        links={[{}]}
        action={
          <Button
            onClick={() => handleOpen('add', undefined)}
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
      <SharedTable
        count={rolesData.length}
        data={rolesData}
        tableHead={TABLE_HEAD}
        actions={[
          {
            label: t('view'),
            icon: 'solar:eye-bold',
            onClick: (item) => console.log('test'),
          },
          {
            label: t('edit'),
            icon: 'solar:pen-bold',
            onClick: (item) => handleOpen('edit', item),
          },

          {
            label: t('delete'),
            icon: 'solar:trash-bin-trash-bold',
            onClick: (item: IJobRole) => {
              confirm.onTrue();
            },
            sx: { color: 'error.main' },
          },
        ]}
        customRender={{
          image: (x) => (
            <Avatar src={x.image} alt={x.image} sx={{ mr: 2 }}>
              {x.english_job_type.charAt(0).toUpperCase()}
            </Avatar>
          ),
        }}
      />
      <JobRolesDialog open={quickAdd.value} onClose={quickAdd.onFalse} item={selectedStandard} />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('delete')}
        content={t('delete_confirm')}
        handleConfirmDelete={handleConfirmDelete}
      />
    </Container>
  );
}
