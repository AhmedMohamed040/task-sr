// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    sports: `${ROOTS.DASHBOARD}/sports-activities`,
    subscription: `${ROOTS.DASHBOARD}/subscription-packages`,
    ManageSubscriberAccounts: `${ROOTS.DASHBOARD}/manage-subscriber-accounts`,
    reportsStatistics: `${ROOTS.DASHBOARD}/reports-statistics`,
    support: `${ROOTS.DASHBOARD}/support`,
    notifications: `${ROOTS.DASHBOARD}/notifications`
  },
};
