'use client';

import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import { useTranslate } from 'src/locales';
import Container from '@mui/material/Container';
import { ISportsActivities } from 'src/types/subscriber';
import { useSettingsContext } from 'src/components/settings';
import SharedTable from 'src/CustomSharedComponents/SharedTable/SharedTable';

const employees: ISportsActivities[] = [
  {
    id: '1',
    image:
      'https://th.bing.com/th/id/R.8ddb7c54db72202ba55388ed3a0a1a90?rik=Dfajyx7z40%2fWPA&pid=ImgRaw&r=0',
    name: 'كرة قدم',
  },
  {
    id: '2',
    image: 'https://th.bing.com/th/id/OIP.F-dXqRCOgOmgGafsL8CXfAAAAA?rs=1&pid=ImgDetMain',
    name: 'سباحة',
  },
  {
    id: '3',
    image: 'https://th.bing.com/th/id/OIP.xJ4T1-uppppvkviNJA1biAHaHa?rs=1&pid=ImgDetMain',
    name: 'كرة يد',
  },
  {
    id: '4',
    image: 'https://th.bing.com/th/id/OIP.kXx3fghpj_rcvnuokjkzYAHaE8?rs=1&pid=ImgDetMain',
    name: 'كرة طائرة',
  },
  {
    id: '5',
    image:
      'https://th.bing.com/th/id/R.8ddb7c54db72202ba55388ed3a0a1a90?rik=Dfajyx7z40%2fWPA&pid=ImgRaw&r=0',
    name: 'كرة قدم',
  },
];

const TABLE_HEAD = [
  { id: 'image', label: 'IMAGE' },
  { id: 'name', label: 'SPORTS_ACTIVITY_NAME' },
];

export default function SportsActivities() {
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
            image: (x) => <Avatar src={x.image} alt={x.image} />,
          }}
        />
      </Card>
    </Container>
  );
}
