import dynamic from 'next/dynamic';

const OnboardingGuide = dynamic(
  () => import('../components/OnboardingGuide'),
  { ssr: false }
);

export default function Home() {
  return <OnboardingGuide />;
}
