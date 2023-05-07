export function load({ url }: { url: URL }) {
  const redirect = url.searchParams.get('redirect') || '/';
  return {
    redirect
  }
}
