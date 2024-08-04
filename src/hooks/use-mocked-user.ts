import { _mock } from 'src/_mock';

// TO GET THE USER FROM THE AUTHCONTEXT, YOU CAN USE

// CHANGE:
// import { useMockedUser } from 'src/hooks/use-mocked-user';
// const { user } = useMockedUser();

// TO:
// import { useAuthContext } from 'src/auth/hooks';
// const { user } = useAuthContext();

// ----------------------------------------------------------------------

export function useMockedUser() {
  const user = {
    id: "8864c717-587d-472a-929a-8e5f298024da-0",
    account: "47467838",
    name: null,
    username: "admin@admin.com",
    email: "admin@admin.com",
    email_verified_at: null,
    role: "admin",
    displayName: 'Jaydon Frankie',
    password: 'Aa123456@',
    photoURL: "https://symlink.live/api//v1/null" || _mock.image.avatar(24),
    phoneNumber: '+40 777666555',
    country: 'United States',
    address: '90210 Broadway Blvd',
    state: 'California',
    city: 'San Francisco',
    zipCode: '94116',
    about: 'Praesent turpis. Phasellus viverra nulla ut metus varius laoreet. Phasellus tempus.',
    isPublic: true,
  };

  return { user };
}
