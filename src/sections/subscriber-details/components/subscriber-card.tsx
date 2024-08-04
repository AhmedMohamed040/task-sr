import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';

import { fShortenNumber } from 'src/utils/format-number';

import { AvatarShape } from 'src/assets/illustrations';

import Image from 'src/components/image';

import { useTranslate } from 'src/locales';
import { ISubscriberCard } from 'src/types/subscriber';
import { Link } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  user: ISubscriberCard;
};

export default function SubscriberCard({ user }: Props) {
  const theme = useTheme();
  const { t } = useTranslate();

  const { name, type, coverUrl, role, numberOfBranches, address, avatarUrl, workingHours } = user;

  const StyledLink = {
    textDecoration: 'none',
    color: 'inherit',
    '&:hover': {
      textDecoration: 'none',
      color: 'inherit',
      opacity: '0.9',
      cursor: 'pointer',
    },
  };

  return (
    <Card sx={{ textAlign: 'center' }}>
      <Link sx={StyledLink} href={'/'}>
        <Box sx={{ position: 'relative' }}>
          <AvatarShape
            sx={{
              left: 0,
              right: 0,
              zIndex: 10,
              mx: 'auto',
              bottom: -26,
              position: 'absolute',
            }}
          />

          <Avatar
            alt={name}
            src={avatarUrl}
            sx={{
              width: 64,
              height: 64,
              zIndex: 11,
              left: 0,
              right: 0,
              bottom: -32,
              mx: 'auto',
              position: 'absolute',
            }}
          />

          <Image
            src={coverUrl}
            alt={coverUrl}
            ratio="16/9"
            overlay={alpha(theme.palette.grey[900], 0.48)}
          />
        </Box>

        <ListItemText
          sx={{ mt: 7, mb: 1 }}
          primary={name}
          secondary={
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography variant="caption" color="initial">
                {role}
              </Typography>
              <Typography variant="caption" color="initial">
                {type}
              </Typography>
            </Box>
          }
          primaryTypographyProps={{ typography: 'subtitle1' }}
          secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
        />

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box
          display="grid"
          gridTemplateColumns="repeat(3, 1fr)"
          sx={{ py: 3, mx: 1, typography: 'subtitle1' }}
        >
          <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              {t('Address')}
            </Typography>
            <Typography variant="caption" component="div" sx={{ fontWeight: '600' }}>
              {address}
            </Typography>
          </div>

          <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              {t('Number of Branches')}
            </Typography>
            <Typography variant="caption" component="div" sx={{ fontWeight: '600' }}>
              {fShortenNumber(numberOfBranches)}
            </Typography>
          </div>

          <div>
            <Typography variant="caption" component="div" sx={{ mb: 0.5, color: 'text.secondary' }}>
              {t('Working Hours')}
            </Typography>
            <Typography variant="caption" component="div" sx={{ fontWeight: '600' }}>
              {workingHours}
            </Typography>
          </div>
        </Box>
      </Link>
    </Card>
  );
}
