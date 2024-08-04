'use client';

import { useState } from 'react';

import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { Typography } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { getCustomNameKeyLang } from 'src/utils/translator';

import { useTranslate } from 'src/locales';
import SharedTable from 'src/CustomSharedComponents/SharedTable/SharedTable';

import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { ISubscriptionStatus } from 'src/types/subscriber';

const statusData: ISubscriptionStatus[] = [
  {
    id: '1',
    image: '/assets/images/about/hero.jpg',
    academy_name: 'John Doe',
    duration: { ar_durration: '201 يوم', en_duration: '201 days' },
    sports: { name_ar: 'كرة قدم', name_en: 'Football' },
    rating: 4.5,
    status: 'ACTIVE',
  },
  {
    id: '2',
    image: '/assets/images/about/hero.jpg',
    academy_name: 'John Doe',
    duration: { ar_durration: '201 يوم', en_duration: '201 days' },
    sports: { name_ar: 'كرة قدم', name_en: 'Football' },
    rating: 4.5,
    status: 'ACTIVE',
  },
  {
    id: '3',
    image: '/assets/images/about/hero.jpg',
    academy_name: 'John Doe',
    duration: { ar_durration: '201 يوم', en_duration: '201 days' },
    sports: { name_ar: 'كرة قدم', name_en: 'Football' },
    rating: 3,
    status: 'INACTIVE',
  },
  {
    id: '4',
    image: '/assets/images/about/hero.jpg',
    academy_name: 'John Doe',
    duration: { ar_durration: '201 يوم', en_duration: '201 days' },
    sports: { name_ar: 'كرة قدم', name_en: 'Football' },
    rating: 4.5,
    status: 'INACTIVE',
  },
  {
    id: '5',
    image: '/assets/images/about/hero.jpg',
    academy_name: 'John Doe',
    duration: { ar_durration: '201 يوم', en_duration: '201 days' },
    sports: { name_ar: 'كرة قدم', name_en: 'Football' },
    rating: 4,
    status: 'ACTIVE',
  },
];

const TABLE_HEAD = [
  { id: 'image', label: 'image' },
  { id: 'academy_name', label: 'Academy Name' },
  { id: 'duration', label: 'Subscription duration' },
  { id: 'sports', label: 'Sport Activity' },
  { id: 'status', label: 'Status' },
  { id:'' },
];

export default function SubscriptionStatusTable() {
  const [selectedItem, setSelectedItem] = useState<ISubscriptionStatus>();

  const { t } = useTranslate();
  const settings = useSettingsContext();
  const confirm = useBoolean();
  const quickEdit = useBoolean();

  const handleEditItem = (item: ISubscriptionStatus) => {
    setSelectedItem(item);
    if (item) {
      quickEdit.onTrue();
    }
  };
  const handleConfirmDelete = async () => {
    confirm.onFalse();
  };
  return (
    <>
      <SharedTable
        count={statusData.length}
        data={statusData}
        tableHead={TABLE_HEAD}
        customRender={{
          image: (x) => <Avatar src={x.image} alt={x.image} sx={{ mr: 2 }} />,
          sports: (x) => (
            <Typography variant="body1">
              {getCustomNameKeyLang(x.sports.name_en, x.sports.name_ar)}
            </Typography>
          ),
          duration: (x) => (
            <Typography variant="body1">
              {getCustomNameKeyLang(x.duration.en_duration, x.duration.ar_durration)}
            </Typography>
          ),
          rating: (x) => <Rating value={x.rating} precision={0.5} readOnly />,

          status: (x) => (
            <Label color={x.status === 'ACTIVE' ? 'success' : 'error'}>{t(x.status)}</Label>
          ),
        }}
        actions={[
          {
            label: t('edit'),
            icon: 'solar:pen-bold',
            onClick: (item: ISubscriptionStatus) => {
              handleEditItem(item);
            },
          },
          {
            label: t('block'),
            icon: "material-symbols:block" ,
            onClick: (item: ISubscriptionStatus) => {
              confirm.onTrue();
            },
          },
        ]}
      />
        <ConfirmDialog
        open={confirm.value}
        buttonTitle={t('block')}
        onClose={confirm.onFalse}
        title={t('block')}
        content={t('confirm_confirm')}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}
