import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import { useTranslate } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
import { Sports } from 'src/types/subscription-packages';
import { ConfirmDialog } from 'src/components/custom-dialog';
import SharedTable from 'src/CustomSharedComponents/SharedTable/SharedTable';

import SportDialog from '../forms/sport-dialog';

const sportsData = [
  {
    image: '/assets/images/about/hero.jpg',
    arabic_name: 'كرة القدم',
    english_name: 'Football',
    id: '1',
  },
  {
    image: '/assets/images/about/hero.jpg',
    arabic_name: 'كرة السلة',
    english_name: 'Basketball',
    id: '2',
  },
  {
    image: '/assets/images/about/hero.jpg',
    arabic_name: 'الجري',
    english_name: 'Running',
    id: '3',
  },
];

const TABLE_HEAD = [
  { id: 'image', label: 'image' },
  { id: 'arabic_name', label: 'sport_arabic_name' },
  { id: 'english_name', label: 'sport_english_name' },
  { id: '' },
];

function SportServicesTables() {
  const { t } = useTranslate();
  const [selectedItem, setSelectedItem] = useState<Sports>();
  const confirm = useBoolean();
  const quickEdit = useBoolean();

  const handleEditItem = (item: Sports) => {
    setSelectedItem(item);
    if (item) {
      quickEdit.onTrue();
    }
  };
  const handleConfirmDelete = async () => {
    confirm.onFalse();
    setSelectedItem(undefined);
  };

  return (
    <>
      <SharedTable
        count={sportsData.length}
        data={sportsData}
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
              handleEditItem(item);
            },
          },
          {
            label: t('delete'),
            icon: 'solar:trash-bin-trash-bold',
            onClick: (item) => {
              confirm.onTrue();
            },
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
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('delete')}
        content={t('delete_confirm')}
        handleConfirmDelete={handleConfirmDelete}
      />
      <SportDialog sport={selectedItem} open={quickEdit.value} onClose={quickEdit.onFalse} />
    </>
  );
}

export default SportServicesTables;
