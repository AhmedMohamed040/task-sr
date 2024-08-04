'use client';

import Card from '@mui/material/Card';
import Label from 'src/components/label';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import Container from '@mui/material/Container';
import { useSettingsContext } from 'src/components/settings';
import SharedTable from 'src/CustomSharedComponents/SharedTable/SharedTable';

const players = [
  {
    id: '1',
    image: '',
    name: 'John Doe',
    email: 'jL5bN@example.com',
    sports: [
      { name_ar: 'كرة قدم', name_en: 'Football' },
      { name_ar: 'كرة طائرة', name_en: 'Volleyball' },
    ],
    rating: 4.5,
    working: true,
    status: 'ACTIVE',
  },
  {
    id: '2',
    image: '',
    name: 'John Doe',
    email: 'jL5bN@example.com',
    sports: [
      { name_ar: 'كرة قدم', name_en: 'Football' },
      { name_ar: 'كرة طائرة', name_en: 'Volleyball' },
    ],
    rating: 4.5,
    working: true,
    status: 'ACTIVE',
  },
  {
    id: '3',
    image: '',
    name: 'John Doe',
    email: 'jL5bN@example.com',
    sports: [
      { name_ar: 'كرة قدم', name_en: 'Football' },
      { name_ar: 'كرة طائرة', name_en: 'Volleyball' },
    ],
    rating: 3,
    working: false,
    status: 'INACTIVE',
  },
  {
    id: '4',
    image: '',
    name: 'John Doe',
    email: 'jL5bN@example.com',
    sports: [
      { name_ar: 'كرة قدم', name_en: 'Football' },
      { name_ar: 'كرة طائرة', name_en: 'Volleyball' },
    ],
    rating: 4.5,
    working: true,
    status: 'INACTIVE',
  },
  {
    id: '5',
    image: '',
    name: 'John Doe',
    email: 'jL5bN@example.com',
    sports: [
      { name_ar: 'كرة قدم', name_en: 'Football' },
      { name_ar: 'كرة طائرة', name_en: 'Volleyball' },
    ],
    rating: 4,
    working: false,
    status: 'ACTIVE',
  },
];

const TABLE_HEAD = [
  { id: 'image', label: 'Image' },
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'sport', label: 'Sport Activity' },
  { id: 'rating', label: 'Rating' },
  { id: 'working', label: 'Working' },
  { id: 'status', label: 'Status' },
];

export default function Players() {
  const {
    t,
    i18n: { language },
  } = useTranslate();
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <SharedTable
          count={players.length}
          data={players}
          tableHead={TABLE_HEAD}
          customRender={{
            image: (x) => <Avatar src={x.image} alt={x.image} sx={{ mr: 2 }} />,
            sports: (x) =>
              x.sports
                .map(({ name_ar, name_en }) => (language === 'ar' ? name_ar : name_en))
                .join(' - '),
            rating: (x) => <Rating value={x.rating} precision={0.5} readOnly />,
            working: (x) => (
              <Iconify
                icon={x.working ? 'carbon:checkmark-filled' : 'gravity-ui:circle-xmark-fill'}
                color={x.working ? 'success.main' : 'error.main'}
                width={24}
              />
            ),
            status: (x) => (
              <Label color={x.status === 'ACTIVE' ? 'success' : 'error'}>{t(x.status)}</Label>
            ),
          }}
        />
      </Card>
    </Container>
  );
}
