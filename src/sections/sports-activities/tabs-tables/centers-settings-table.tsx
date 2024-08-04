import { useCallback, useState } from 'react';

import { useTranslate } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
import { ConfirmDialog } from 'src/components/custom-dialog';
import SharedTable from 'src/CustomSharedComponents/SharedTable/SharedTable';

import CentersDialog from '../forms/centers-dialog';
import Avatar from '@mui/material/Avatar';

const centersData = [
  {
    id: '1',
    image: '/assets/images/about/hero.jpg',
    center_type_ar: 'كرة القدم',
    center_type_en: 'Football',
  },
  {
    id: '2',
    image: '/assets/images/about/hero.jpg',
    center_type_ar: 'كرة السلة',
    center_type_en: 'Basketball',
  },
  {
    id: '3',
    image: '/assets/images/about/hero.jpg',
    center_type_ar: 'الجري',
    center_type_en: 'Running',
  },
];

const TABLE_HEAD = [
  { id: 'image', label: 'image' },
  { id: 'center_type_ar', label: 'center_arabic_type' },
  { id: 'center_type_en', label: 'center_english_type' },
  { id: '' },
];

function CentersSettingsTable() {
  const { t } = useTranslate();

  const [selectedItem, setSelectedItem] = useState<string | undefined>(undefined);

  const formDialog = useBoolean();
  const deleteDialog = useBoolean();

  const handleOnCloseDelete = useCallback(() => {
    deleteDialog.onFalse();
    setSelectedItem(undefined);
  }, [deleteDialog]);

  const handleConfirmDelete = useCallback(() => {
    deleteDialog.onFalse();
    setSelectedItem(undefined);
  }, [deleteDialog]);

  const handleOnCloseForm = useCallback(() => {
    formDialog.onFalse();
    setSelectedItem(undefined);
  }, [formDialog]);

  return (
    <>
      <SharedTable
        count={centersData.length}
        data={centersData}
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

            onClick: (item) => {
              setSelectedItem(item.id);
              formDialog.onTrue();
            },
          },

          {
            label: t('delete'),
            icon: 'solar:trash-bin-trash-bold',
            onClick: (item) => {
              setSelectedItem(item?.id);
              deleteDialog.onTrue();
            },
            sx: { color: 'error.main' },
          },
        ]}
        customRender={{
          image: (item) => (
            <Avatar src={item.image} alt={item.image} sx={{ mr: 2 }}>
              {item.center_type_en.charAt(0).toUpperCase()}
            </Avatar>
          ),
        }}
      />
      <ConfirmDialog
        open={deleteDialog.value}
        onClose={() => handleOnCloseDelete()}
        title={t('delete')}
        content={t('delete_confirm')}
        handleConfirmDelete={() => handleConfirmDelete()}
      />
      {formDialog.value ? (
        <CentersDialog
          open={formDialog.value}
          onClose={() => handleOnCloseForm()}
          center={centersData.find((item) => item?.id === selectedItem)}
        />
      ) : null}
    </>
  );
}

export default CentersSettingsTable;
