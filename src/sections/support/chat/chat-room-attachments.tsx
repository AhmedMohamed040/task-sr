import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDateTime } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import FileThumbnail from 'src/components/file-thumbnail';

import { IChatMessageAccachemt } from 'src/types/support';
import { t } from 'i18next';

// ----------------------------------------------------------------------

type Props = {
  attachments: IChatMessageAccachemt[];
};

export default function ChatRoomAttachments({ attachments }: Props) {
  const collapse = useBoolean(true);

  // eslint-disable-next-line no-unsafe-optional-chaining
  const totalAttachments = (attachments?.length - 1) || '0';

  const renderBtn = (
    <ListItemButton
      disabled={!attachments.length}
      onClick={collapse.onToggle}
      sx={{
        pl: 2.5,
        pr: 1.5,
        height: 40,
        flexShrink: 0,
        flexGrow: 'unset',
        typography: 'overline',
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Box component="span" sx={{ flexGrow: 1 }}>
        {t("Attachments")} ({totalAttachments})
      </Box>
      <Iconify
        width={16}
        icon={
          (!collapse.value && 'eva:arrow-ios-forward-fill') ||
          (!attachments.length && 'eva:arrow-ios-forward-fill') ||
          'eva:arrow-ios-downward-fill'
        }
      />
    </ListItemButton>
  );
  const renderContent = (
    <Scrollbar sx={{ px: 2, py: 2.5 }}>
      {attachments?.map((attachment, index) => (
        attachment && (
          <Stack
          key={index}
          spacing={1.5}
          direction="row"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: 1,
              overflow: 'hidden',
              position: 'relative',
              backgroundColor: 'background.neutral',
            }}
          >
            {attachment && (

            <FileThumbnail
              imageView
              file={attachment?.file_url}
              onDownload={()=> window.open(attachment?.file_url, '_blank')}
              sx={{ width: 70, height: 70 }}
            />
            )}
          </Stack>

          <ListItemText
            primary={attachment?.file_name}
            secondary={fDateTime(attachment?.created_at)}
            primaryTypographyProps={{
              noWrap: true,
              typography: 'body2',
            }}
            secondaryTypographyProps={{
              mt: 0.25,
              noWrap: true,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Stack>
        )
      ))}
    </Scrollbar>
  );

  return (
    <>
      {renderBtn}

      <Box
        sx={{
          overflow: 'hidden',
          height: collapse.value ? 1 : 0,
          transition: (theme) =>
            theme.transitions.create(['height'], {
              duration: theme.transitions.duration.shorter,
            }),
        }}
      >
        {renderContent}
      </Box>
    </>
  );
}
