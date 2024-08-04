'use client';

import Card from '@mui/material/Card';
import Label from 'src/components/label';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { useTranslate } from 'src/locales';
import Iconify from 'src/components/iconify';
import Container from '@mui/material/Container';
import { IEmployee } from 'src/types/subscriber';
import { fDateTime } from 'src/utils/format-time';
import { useSettingsContext } from 'src/components/settings';
import SharedTable from 'src/CustomSharedComponents/SharedTable/SharedTable';

const employees: IEmployee[] = [
  {
    id: '1',
    image: '',
    name: 'John Doe',
    email: 'jL5bN@example.com',
    last_login: '2022-01-01 12:00:00',
    rating: 4.5,
    working: true,
    status: 'ACTIVE',
  },
  {
    id: '2',
    image: '',
    name: 'John Doe',
    email: 'jL5bN@example.com',
    last_login: '2022-01-01 12:00:00',
    rating: 4.5,
    working: true,
    status: 'ACTIVE',
  },
  {
    id: '3',
    image: '',
    name: 'John Doe',
    email: 'jL5bN@example.com',
    last_login: '2022-01-01 12:00:00',
    rating: 3,
    working: false,
    status: 'INACTIVE',
  },
  {
    id: '4',
    image: '',
    name: 'John Doe',
    email: 'jL5bN@example.com',
    last_login: '2022-01-01 12:00:00',
    rating: 4.5,
    working: true,
    status: 'INACTIVE',
  },
  {
    id: '5',
    image: '',
    name: 'John Doe',
    email: 'jL5bN@example.com',
    last_login: '2022-01-01 11:00:00',
    rating: 4,
    working: false,
    status: 'ACTIVE',
  },
];

const TABLE_HEAD = [
  { id: 'image', label: 'Image' },
  { id: 'name', label: 'Name' },
  { id: 'email', label: 'Email' },
  { id: 'last_login', label: 'Last Login' },
  { id: 'rating', label: 'Rating' },
  { id: 'working', label: 'Working' },
  { id: 'status', label: 'Status' },
];

export default function Employees() {
  const { t } = useTranslate();
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card>
        <SharedTable
          count={employees.length}
          data={employees}
          tableHead={TABLE_HEAD}
          customRender={{
            image: (x) => <Avatar src={x.image} alt={x.image} sx={{ mr: 2 }} />,
            rating: (x) => <Rating value={x.rating} precision={0.5} readOnly />,
            working: (x) => (
              <Iconify
                icon={x.working ? 'carbon:checkmark-filled' : 'gravity-ui:circle-xmark-fill'}
                color={x.working ? 'success.main' : 'error.main'}
                width={24}
              />
            ),
            last_login: (x) => <span dir="ltr">{fDateTime(new Date(x.last_login))}</span>,

            status: (x) => (
              <Label color={x.status === 'ACTIVE' ? 'success' : 'error'}>{t(x.status)}</Label>
            ),
          }}
        />
      </Card>
    </Container>
  );
}
