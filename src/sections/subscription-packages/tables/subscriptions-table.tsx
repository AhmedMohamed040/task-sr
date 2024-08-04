import { useState } from 'react';

import Avatar from '@mui/material/Avatar';
import { useTranslate } from 'src/locales';
import { useBoolean } from 'src/hooks/use-boolean';
import { Sports } from 'src/types/subscription-packages';
import { ConfirmDialog } from 'src/components/custom-dialog';
import SharedTable from 'src/CustomSharedComponents/SharedTable/SharedTable';
import { Typography } from '@mui/material';
import PackageDialog from '../forms/package-dialog';
import { ISubscription } from 'src/types/subscriber';
import Label from 'src/components/label';

const standardsData:ISubscription[] = [
  {
    name: 'المميز',
    price: 57,
    image:'',
    number_of_subscribers: 21,
    status: true,
    endDate: "2024-03-04T23:58:47.782Z",
    startDate:"2024-02-04T23:58:47.782Z",
    functions: [],
    duration_for_days: 200,
    id:'1',
  },
  {
    name: 'المميز',
    price: 340,
    image:'',
    number_of_subscribers: 14,
    status: true,
    endDate: "2024-03-04T23:58:47.782Z",
    startDate:"2024-02-04T23:58:47.782Z",
    functions: [],
    duration_for_days: 200,
    id:'2'
  },
  {
    name: 'المميز',
    price: 108,
    number_of_subscribers: 1,
    status: false,
    image:'',
    duration_for_days: 200,
    endDate: "2024-03-04T23:58:47.782Z",
    startDate:"2024-02-04T23:58:47.782Z",
    functions: [],
    id:'3'
  },

  {
    name: 'المميز',
    price: 279,
    number_of_subscribers: 9,
    status: true,
    image:'',
    endDate: "2024-03-04T23:58:47.782Z",
    startDate:"2024-02-04T23:58:47.782Z",
    functions: [],
    duration_for_days: 200,
    id:'4'
  },

];

const TABLE_HEAD = [
  { id: 'name', label: 'Package name' },
  { id: 'price', label: 'Price' },
  { id: 'number_of_subscribers', label: 'Number of subscribers' },
  { id: 'status', label: 'Status' },
  { id: 'duration_for_days', label: 'Duration for days' },
  { id: '' },
];

function SubscriptionTable() {
  const { t } = useTranslate();
  const [selectedItem, setSelectedItem] = useState<ISubscription>();
  const confirm = useBoolean();
  const quickEdit = useBoolean();

  const handleEditItem = (item: ISubscription) => {
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
        /*   {
            label: t('view'),
            icon: 'solar:eye-bold',
            onClick: (item) => console.log('test'),
          }, */
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
          (item?.status && 'success') ||
          (!item?.status  && 'warning') ||
          'default'
        }
      >
         {item?.status ? t('Active'): t("Inactive")}
      </Label>

          ),
        }}
      />
      <PackageDialog subscribePackage={selectedItem} open={quickEdit.value} onClose={quickEdit.onFalse} />

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

export default SubscriptionTable;
