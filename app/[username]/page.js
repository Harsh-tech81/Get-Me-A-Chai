
// This is how we make a Dynamic Routes in NextJS 13
export default async function Username({ params }) {
   const { username } = await params;
  return (
    <div>
      <h1>Welcome, {username}</h1>
    </div>
  );
}