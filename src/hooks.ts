import cookie from 'cookie';

export function getSession({ request }: { request: Request }) {
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  const theme = cookies.theme || 'dark';
  return {
    theme
  }
}
