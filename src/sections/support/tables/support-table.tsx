import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import { useTranslate } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
import { Sports } from 'src/types/subscription-packages';
import { ConfirmDialog } from 'src/components/custom-dialog';
import SharedTable from 'src/CustomSharedComponents/SharedTable/SharedTable';
import { Typography } from '@mui/material';
import { ITicket } from 'src/types/support';
import Label from 'src/components/label';
import { fDate } from 'src/utils/format-time';
import TicketDialog from '../forms/ticket-form';
import { useRouter } from 'next/navigation';
import { paths } from 'src/routes/paths';
const standardsData:ITicket[] = [

  {
    name: 'Amin',
    newMessages: 2,
    phone: '+201022784581',
    status: "OPEN",
    ticketNumber:'045 5-50',
    date: "2024-03-04T23:58:47.782Z",
    description: 'يوجد خطأ في',
    title:"خطأ",
    id:'1'
  },
  {
    name: 'Amin',
    newMessages: 2,
    phone: '+201022784581',
    status: "OPEN",
    ticketNumber:'045 5-50',
    date: "2024-03-04T23:58:47.782Z",
    description: 'يوجد خطأ في',
    title:"خطأ",
    id:'2'
  },
  {
    name: 'Amin',
    newMessages: 2,
    phone: '+201022784581',
    status: "CLOSED",
    ticketNumber:'045 5-50',
    date: "2024-03-04T23:58:47.782Z",
    description: 'يوجد خطأ في',
    title:"خطأ",
    id:'3'
  },
  {
    name: 'Amin',
    newMessages: 2,
    phone: '+201022784581',
    status:"OPEN",
    ticketNumber:'045 5-50',
    date: "2024-03-04T23:58:47.782Z",
    description: 'يوجد خطأ في',
    title:"خطأ",
    id:'4'
  },
  {
    name: 'Amin',
    newMessages: 2,
    phone: '+201022784581',
    status: "CLOSED",
    ticketNumber:'045 5-50',
    date: "2024-03-04T23:58:47.782Z",
    description: 'يوجد خطأ في',
    title:"خطأ",
    id:'5'
  },
  {
    name: 'Amin',
    newMessages: 2,
    phone: '+201022784581',
    status:"OPEN",
    ticketNumber:'045 5-50',
    date: "2024-03-04T23:58:47.782Z",
    description: 'يوجد خطأ في',
    title:"خطأ",
    id:'6'
  },

];

const TABLE_HEAD = [
  { id: 'ticketNumber', label: 'Ticket number' },
  { id: 'name', label: 'Name' },
  { id: 'phone', label: 'Phone' },
  { id: 'title', label: 'Title' },
  { id: 'description', label: 'Description' },
  { id: 'date', label: 'Date' },
  { id: 'status', label: 'Status' },
  { id: 'newMessages', label: 'New messages' },
  { id: '' },
];

function SupportTable() {
  const { t } = useTranslate();
  const [selectedItem, setSelectedItem] = useState<ITicket>();
  const confirm = useBoolean();
  const quickEdit = useBoolean();
  const router = useRouter();

  const handleEditItem = (item: ITicket) => {
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
        count={standardsData.length}
        data={standardsData}
        tableHead={TABLE_HEAD}
        actions={[
          {
            label: t('view'),
            icon: 'solar:eye-bold',
            onClick: (item) => router.push(`${paths.dashboard.support}/${item?.id}`),
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
          status: (item) => (
         <Label
        variant="soft"
        color={
          (item?.status === 'RESOLVED' && 'success') ||
          (item?.status === 'OPEN' && 'info') ||
          (item?.status === 'IN_PROGRESS' && 'warning') ||
          (item?.status === 'CLOSED' && 'secondary') ||
          (item?.status === 'CANCELLED' && 'error') ||

          'default'
        }
      >
       {item?.status ==="OPEN" ? t("Open") :
       item?.status === "CLOSED" ? t('Closed'):
       'none'}
      </Label>

          ),
          date: (item) => (
           <Typography variant="overline">
            {fDate(item?.date)}
            </Typography>
            ),
        }}
      />
      <TicketDialog ticket={selectedItem} open={quickEdit.value} onClose={quickEdit.onFalse} />
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title={t('delete')}
        content={t('delete_confirm')}
        handleConfirmDelete={handleConfirmDelete}
      />
    </>
  );
}

export default SupportTable;
