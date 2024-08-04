import { useMemo } from 'react';

import { paths } from 'src/routes/paths';

import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
  // OR
  // <Iconify icon="fluent:mail-24-filled" />
  // https://icon-sets.iconify.design/solar/
  // https://www.streamlinehq.com/icons
);

const ICONS = {
  job: icon('ic_job'),
  blog: icon('ic_blog'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  tour: icon('ic_tour'),
  order: icon('ic_order'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  sports: icon('ic_sports'),
  product: icon('ic_product'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  home: icon('ic_home'),
  users: icon('ic_users'),
  statistics: icon('ic_statistics'),
  support: icon('ic_support'),
  admin: icon('ic_admin'),
};

// ----------------------------------------------------------------------

export function useNavData() {
  const data = useMemo(
    () => [
      // OVERVIEW
      // ----------------------------------------------------------------------
      {
        // subheader: 'overview v5.7.0',
        subheader: '',
        items: [
          { title: 'Induction Site', path: paths.dashboard.root, icon: ICONS.home },
          {
            title: 'Manage sports activities',
            path: paths.dashboard.sports,
            icon: ICONS.sports,
          },
          {
            title: 'Manage subscription packages',
            path: paths.dashboard.subscription,
            icon: ICONS.invoice,
          },
          {
            title: 'Manage subscriber accounts',
            path: paths.dashboard.ManageSubscriberAccounts,
            icon: ICONS.users,
          },
          { title: 'Reports & Statistics', path: paths.dashboard.reportsStatistics, icon: ICONS.analytics },
          {
            title: 'Manage notifications and alerts',
            path: paths.dashboard.notifications,
            icon: ICONS.chat,
          },
          { title: 'Technical Support', path: paths.dashboard.support, icon: ICONS.support },
          {
            title: 'Manage administrator accounts',
            path: '/null',
            icon: ICONS.admin,
          },
          { title: 'Blog', path: '/null', icon: ICONS.blog },
        ],
      },
    ],
    []
  );

  return data;
}
