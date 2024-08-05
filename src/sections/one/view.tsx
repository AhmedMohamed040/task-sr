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
import { useState } from 'react';
import { Card } from '@mui/material';
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
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography sx={{ my: 3 }} variant="h4"> Page One </Typography>
      <Card>

        <SharedTable
          count={dataTable.length}
          data={dataTable}
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
                  {item?.record_status ==="active" ? "active": "Inactive"}
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
