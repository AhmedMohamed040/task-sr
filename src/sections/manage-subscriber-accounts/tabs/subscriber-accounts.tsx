'use client';

import { useRouter } from 'next/navigation';

import { Box, Card, Container } from '@mui/material';

import { useSettingsContext } from 'src/components/settings';

import SubscriberCard from '../components/subscriber-card';
import { ISubscriberCard } from 'src/types/subscriber';
import SubscriptionAccountsTable from '../tables/subscription-accounts-table';

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

export default function SubscriberAccounts() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <SubscriptionAccountsTable />
      </Card>
    </Container>
  );
}
