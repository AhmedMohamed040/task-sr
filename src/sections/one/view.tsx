'use client';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { useSettingsContext } from 'src/components/settings';
import Label from 'src/components/label';
import SharedTable from 'src/components/SharedTable/SharedTable';
import { fDate } from 'src/utils/format-time';
import { dataTable } from 'src/_mock/map/table-data';
import { User } from 'src/types/user';
import { ReactEventHandler, useState } from 'react';
import { Card, Unstable_Grid2 as Grid, MenuItem, Select, TextField } from '@mui/material';
// notice: in real scenario we will use requests to get data from back-end
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'created_dt', label: 'Created DT' },
  { id: 'data_source_modified_dt', label: 'Modifed DT' },
  { id: 'entity_type', label: 'Entity' },
  { id: 'record_status', label: 'Operating status' },
  { id: 'legal_name', label: 'Legal name' },
  { id: 'dba_name', label: 'DBA name' },
  { id: 'physical_address', label: 'Physical address' },
  { id: 'phone', label: 'Phone' },
  { id: 'usdot_number', label: 'DOT' },
  { id: 'mc_mx_ff_number', label: 'MC/MX/FF' },
  { id: 'power_units', label: 'Power units' },
  { id: 'out_of_service_date', label: 'Out date' },
  { id: '' },
];
export default function OneView() {
  const settings = useSettingsContext();
  const [searchByName, setSearchByName] = useState('');
  const [searchByUnits, setSearchByUnits] = useState('');
  const [searchPhone, setSearchByPhone] = useState('');
  const [searchStatus, setSearchByStatus] = useState('all');
  const [data_Table, SetDate_table] = useState(dataTable);

  // notice: in real scenario we will use filters from back-end
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, p_name: string = 'legal_name') => {
    const { name, value } = event.target
    switch (name) {
      case 'searchByName':
        setSearchByName(value);
        break;
      case 'searchByUnits':
        setSearchByUnits(value);
        break;
      case 'searchPhone':
        setSearchByPhone(value);
        break;
      case 'searchStatus':
        setSearchByStatus(value);
        break;
      default:
        break;
    }

    if (p_name !== 'record_status') {
      const filteredData = data_Table.filter((item: any) => String(item[p_name]).toLowerCase().includes(value.toLowerCase()))
      if (value === '') {
        setSearchByName('');
        setSearchByUnits('');
        setSearchByPhone('');
        setSearchByStatus('all')
        SetDate_table(dataTable);
      } else {

        SetDate_table(filteredData)
      }
    }else {
      const filteredData = dataTable.filter((item: any) => String(item[p_name]).toLowerCase().includes(value.toLowerCase()))
      if (value === 'all') {
        SetDate_table(dataTable)
        setSearchByName('');
        setSearchByUnits('');
        setSearchByPhone('');
      } else {
        SetDate_table(filteredData)
      }
      setSearchByStatus(value)

    }

  }
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography sx={{ my: 3 }} variant="h4"> Users </Typography>
      <Card sx={{ my: 3, p: 2 }}>

        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid xs={6} md={3}>
            <TextField
              placeholder="Legal name"
              name="searchByName"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'legal_name')}
              value={searchByName}
            />
          </Grid>
          <Grid xs={6} md={3}>
            <TextField

              placeholder="Units"
              name="searchByUnits"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'power_units')}
              value={searchByUnits}
            />
          </Grid>
          <Grid xs={6} md={3}>
            <TextField
              placeholder="phone"
              name="searchPhone"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, 'phone')}
              value={searchPhone}
            />
          </Grid>
          <Grid xs={6} md={3}>
            <Select


              sx={{width:'100%'}}
              value={searchStatus}
              placeholder="Status"
              onChange={(e:any) => handleChange(e, 'record_status')}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value={'active'}>Active</MenuItem>
              <MenuItem value={'null'}>Inactive</MenuItem>
            </Select>
          </Grid>

        </Grid>


      </Card>
      <Card>

        <SharedTable
          count={data_Table.length}
          data={data_Table}
          tableHead={TABLE_HEAD}
          actions={[
            {
              label: 'view',
              icon: 'solar:eye-bold',
              onClick: (item) => console.log('here'),
            },


          ]}
          customRender={{
            record_status: (item: User) => (
              item?.record_status && (
                <Label
                  variant="soft"
                  color={
                    (item?.record_status === 'active' && 'success') ||
                    'warning'
                  }
                >
                  {item?.record_status === "active" ? "active" : "Inactive"}
                </Label>
              )
            ),
            created_dt: (item) => (
              <Typography variant="overline">
                {fDate(item?.created_dt)}
              </Typography>
            ),
            data_source_modified_dt: (item) => (
              <Typography variant="overline">
                {fDate(item?.data_source_modified_dt)}
              </Typography>
            ),
            out_of_service_date: (item) => (
              <Typography variant="overline">
                {item?.out_of_service_date || "None"}
              </Typography>
            ),
            physical_address: (item) => (
              <Typography variant="overline"
              >
                {item?.physical_address || "None"}
              </Typography>
            ),
            mc_mx_ff_number: (item) => (
              <Typography variant="overline"
              >
                {item?.mc_mx_ff_number || "None"}
              </Typography>
            ),
            dba_name: (item) => (
              <Typography variant="overline"
              >
                {item?.dba_name || "None"}
              </Typography>
            ),

          }}
        />
      </Card>
    </Container>
  );
}
