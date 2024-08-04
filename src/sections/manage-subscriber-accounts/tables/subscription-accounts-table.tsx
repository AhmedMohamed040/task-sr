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

import { ISubscriberCard } from 'src/types/subscriber';
import { paths } from 'src/routes/paths';
import { useRouter } from 'next/navigation';


const users: ISubscriberCard[] = [
  {
    id: '1',
    name: 'أكاديمية ال عجمان',
    role: 'ال عجمان للكرة',
    type: 'السجل التجارى',
    coverUrl: '/assets/images/cover.jpg',
    avatarUrl: '/assets/images/profile.jpg',
    address: 'أبراج الرياض مكة',
    numberOfBranches: 782500,
    workingHours: 'كل يوم عدا الجمعه',
  },
  {
    id: '2',
    name: 'أكاديمية ال عجمان',
    role: 'ال عجمان للكرة',
    type: 'السجل التجارى',
    coverUrl: '/assets/images/cover.jpg',
    avatarUrl: '/assets/images/profile.jpg',
    address: 'أبراج الرياض مكة',
    numberOfBranches: 782500,
    workingHours: 'كل يوم عدا الجمعه',
  },
  {
    id: '3',
    name: 'أكاديمية ال عجمان',
    role: 'ال عجمان للكرة',
    type: 'السجل التجارى',
    coverUrl: '/assets/images/cover.jpg',
    avatarUrl: '/assets/images/profile.jpg',
    address: 'أبراج الرياض مكة',
    numberOfBranches: 782500,
    workingHours: 'كل يوم عدا الجمعه',
  },
  {
    id: '4',
    name: 'أكاديمية ال عجمان',
    role: 'ال عجمان للكرة',
    type: 'السجل التجارى',
    coverUrl: '/assets/images/cover.jpg',
    avatarUrl: '/assets/images/profile.jpg',
    address: 'أبراج الرياض مكة',
    numberOfBranches: 782500,
    workingHours: 'كل يوم عدا الجمعه',
  },
  {
    id: '5',
    name: 'أكاديمية ال عجمان',
    role: 'ال عجمان للكرة',
    type: 'السجل التجارى',
    coverUrl: '/assets/images/cover.jpg',
    avatarUrl: '/assets/images/profile.jpg',
    address: 'أبراج الرياض مكة',
    numberOfBranches: 782500,
    workingHours: 'كل يوم عدا الجمعه',
  },
  {
    id: '6',
    name: 'أكاديمية ال عجمان',
    role: 'ال عجمان للكرة',
    type: 'السجل التجارى',
    coverUrl: '/assets/images/cover.jpg',
    avatarUrl: '/assets/images/profile.jpg',
    address: 'أبراج الرياض مكة',
    numberOfBranches: 782500,
    workingHours: 'كل يوم عدا الجمعه',
  },
  {
    id: '7',
    name: 'أكاديمية ال عجمان',
    role: 'ال عجمان للكرة',
    type: 'السجل التجارى',
    coverUrl: '/assets/images/cover.jpg',
    avatarUrl: '/assets/images/profile.jpg',
    address: 'أبراج الرياض مكة',
    numberOfBranches: 782500,
    workingHours: 'كل يوم عدا الجمعه',
  },
  {
    id: '8',
    name: 'أكاديمية ال عجمان',
    role: 'ال عجمان للكرة',
    type: 'السجل التجارى',
    coverUrl: '/assets/images/cover.jpg',
    avatarUrl: '/assets/images/profile.jpg',
    address: 'أبراج الرياض مكة',
    numberOfBranches: 782500,
    workingHours: 'كل يوم عدا الجمعه',
  },
];

const TABLE_HEAD = [
  { id: 'avatarUrl', label: 'Image' },
  { id: 'name', label: 'Academy Name' },
  { id: 'role', label: 'Role' },
  { id: 'workingHours', label: 'Working hours' },
  { id: 'address', label: 'Address' },
  { id: 'numberOfBranches', label: 'Number of branches' },
  { id:'' },
];

export default function SubscriptionAccountsTable() {
  const [selectedItem, setSelectedItem] = useState<ISubscriberCard>();
  const router = useRouter();

  const { t } = useTranslate();
  const settings = useSettingsContext();
  const confirm = useBoolean();
  const quickEdit = useBoolean();

  const handleEditItem = (item: ISubscriberCard) => {
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
        count={users.length}
        data={users}
        tableHead={TABLE_HEAD}
        customRender={{
          avatarUrl: (x) => <Avatar src={x.avatarUrl} alt={x.avatarUrl} sx={{ mr: 2 }} />,


        }}
        actions={[
          {
            label: t('view'),
            icon: 'solar:eye-bold',
            onClick: (item) => router.push(`${paths.dashboard.ManageSubscriberAccounts}/${item?.id}`)
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
