import { formatDistanceToNowStrict } from 'date-fns';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';

import FileThumbnail from 'src/components/file-thumbnail';

import { IChatMessage } from 'src/types/support';

import { useGetMessage } from './hooks';

// ----------------------------------------------------------------------

type Props = {
  message: IChatMessage;
  onOpenLightbox: (value: string) => void;
};

export default function ChatMessageItem({ message,onOpenLightbox }: Props) {

  const {me,  senderDetails, hasImage } = useGetMessage({ message });

  const { firstName, avatarUrl } = senderDetails;

  const { comment_text, created_at } = message;

  const handlePdfFile = hasImage?.file_type?.includes('pdf');
  const handleWordFile = hasImage?.file_type?.includes('document');

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...(!me && {
          mr: 'auto',
        }),
      }}
    >
      {!me && `${firstName},`} &nbsp;
      {formatDistanceToNowStrict(new Date(created_at), {
        addSuffix: true,
      })}
    </Typography>
  );

  const renderBody = (
    <Stack
      sx={{
        ...(!me && {
          bgcolor: 'background.neutral',
        }),

        minWidth: 48,
        maxWidth: 320,
        p: hasImage ? 0 : 1.5 ,
        borderRadius: 1,
        typography: 'body2',
        ...(me && {
         color: !hasImage ? 'grey.800' :'',
          bgcolor: 'primary.light',
        }),
        ...(hasImage && {
          bgcolor: 'transparent',
        }),
      }}
    >
      {hasImage ? (
        <>
        {comment_text}
        {handlePdfFile || handleWordFile ? (
          <FileThumbnail
          imageView
          file={hasImage?.file_url}
          onDownload={() => console.info('DOWNLOAD')}
          sx={{ width: 70, height: 70, position: 'relative',
        }}
        />
        ):(
          <Box
          component="img"
          alt="attachment"
          src={hasImage?.file_url || ''}
          onClick={() => window?.open(hasImage.file_url, '_blank')}
          sx={{
            minHeight: 220,
            borderRadius: 1.5,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        />
        )}


        </>
      ) : (
        comment_text
      )}
    </Stack>
  );

  const renderActions = (
    <Stack
      direction="row"
      className="message-actions"
      sx={{
        pt: 0.5,
        opacity: 0,
        top: '100%',
        left: 0,
        position: 'absolute',
        transition: (theme) =>
          theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.shorter,
          }),
        ...(me && {
          left: 'unset',
          right: 0,
        }),
      }}
    >
    {/*   <IconButton size="small">
        <Iconify icon="solar:reply-bold" width={16} />
      </IconButton>
      <IconButton size="small">
        <Iconify icon="eva:smiling-face-fill" width={16} />
      </IconButton>
      <IconButton size="small">
        <Iconify icon="solar:trash-bin-trash-bold" width={16} />
      </IconButton> */}
    </Stack>
  );

  return (
    <Stack direction="row" justifyContent={me ? 'flex-end' : 'unset'} sx={{ mb: 5 }}>
      {!me && <Avatar alt={firstName} src={avatarUrl} sx={{ width: 32, height: 32, mr: 2 }} />}

      <Stack alignItems={me ? 'flex-end' : 'unset'}>
        {renderInfo}

        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: 'relative',
            '&:hover': {
              '& .message-actions': {
                opacity: 1,
              },
            },
          }}
        >
          {renderBody}
          {renderActions}
        </Stack>
      </Stack>
    </Stack>
  );
}
