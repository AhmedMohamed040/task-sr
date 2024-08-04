import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { fToNow } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';

import { IChatMessage } from 'src/types/support';

// ----------------------------------------------------------------------

type Props = {
  participants: IChatMessage[];
};

export default function ChatHeaderDetail({ participants }: Props) {

  const singleParticipant = participants[0];

  const renderSingle = (
    <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>

        <Avatar src={singleParticipant?.user?.avatar || ''} alt={singleParticipant?.user?.name || ''} />

      <ListItemText
        primary={singleParticipant?.user?.name}
    /*     secondary={
          singleParticipant.status === 'offline'
            ? fToNow(singleParticipant.lastActivity)
            : singleParticipant.status
        } */
      /*   secondaryTypographyProps={{
          component: 'span',
          ...(singleParticipant.status !== 'offline' && {
            textTransform: 'capitalize',
          }),
        }} */
      />
    </Stack>
  );

  return (
    <>
      {renderSingle}


    </>
  );
}
