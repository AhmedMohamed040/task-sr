import { JwtRestPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Rest Password',
};

type props = {
  params: {
    token: string;
  }
};
export default function RegisterPage({params}:props) {
  return <JwtRestPasswordView token={params?.token}/>;
}
