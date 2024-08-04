import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import { useTranslate } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { IStandardsManagment } from 'src/types/subscription-packages';
import SharedTable from 'src/CustomSharedComponents/SharedTable/SharedTable';

import StandardsManagementDialog from '../forms/standards-managment';

const standardsData = [
  {
    image: '/assets/images/about/hero.jpg',
    arabic_name: 'كرة القدم',
    english_name: 'Football',
    arabic_measurement: 'جري',
    english_measurement: 'running',
    value: '8:10',
    id: '1',
  },
  {
    image: '/assets/images/about/hero.jpg',
    arabic_name: 'كرة السلة',
    english_name: 'Basketball',
    arabic_measurement: 'جري',
    english_measurement: 'running',
    value: '8:10',
    id: '2',
  },
  {
    image: '/assets/images/about/hero.jpg',
    arabic_name: 'الجري',
    english_name: 'Running',
    arabic_measurement: 'جري',
    english_measurement: 'running',
    value: '8:10',
    id: '3',
  },
];

const TABLE_HEAD = [
  { id: 'image', label: 'image' },
  { id: 'arabic_name', label: 'sport_arabic_name' },
  { id: 'english_name', label: 'sport_english_name' },
  { id: 'arabic_measurement', label: 'arabic_measurement' },
  { id: 'english_measurement', label: 'english_measurement' },
  { id: 'value', label: 'value' },
  { id: '' },
];

function StandardsManagementTable() {
  const { t } = useTranslate();
  const quickEdit = useBoolean();
  const [selectedStandard, setSelectedStandard] = useState<IStandardsManagment | undefined>(
    undefined
  );
  const confirm = useBoolean();

  const handleConfirmDelete = async () => {
    confirm.onFalse();
  };
  const handleOpen = (standard: IStandardsManagment | undefined) => {
    setSelectedStandard(standard);
    if (selectedStandard) {
      quickEdit.onTrue();
    }
  };
  return (
    <>
      <SharedTable
        count={standardsData.length}
        data={standardsData}
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
            onClick: (item) => handleOpen(item),
          },

          {
            label: t('delete'),
            icon: 'solar:trash-bin-trash-bold',
            onClick: (item) => {
              confirm.onTrue();
            },
            sx: { color: 'error.main' },
          },
        ]}
        customRender={{
          image: (item) => (
            <Avatar src={item.image} alt={item.image} sx={{ mr: 2 }}>
              {item.english_name.charAt(0)?.toUpperCase()}
            </Avatar>
          ),
        }}
      />
      <StandardsManagementDialog
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
        item={selectedStandard}
      />

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('delete')}
        content={t('delete_confirm')}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default StandardsManagementTable;
