import Link from 'next/link';

export default function PreviewBanner() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-black text-center py-2 text-sm font-medium">
      🔶 Mode Aperçu activé - Les modifications non publiées sont visibles
      <Link
        href="/api/draft/disable"
        className="ml-4 underline hover:no-underline"
      >
        Quitter l&apos;aperçu
      </Link>
    </div>
  );
}
