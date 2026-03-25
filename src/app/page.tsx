import { getAllPosts } from '@/lib/blog';
import HomeClient from './HomeClient';

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return <HomeClient latestPosts={latestPosts} />;
}
