import { getMetadata } from '@/config/seo';
import OrbitLabClient from './OrbitLabClient';

export const metadata = getMetadata('/portfolio/orbit-lab/');

export default function OrbitLabPage() {
  return <OrbitLabClient />;
}
