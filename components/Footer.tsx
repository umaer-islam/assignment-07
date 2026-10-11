export interface FooterProps {
  categories?: unknown[];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function Footer(_props: FooterProps = {}) {
  return (
    <footer className="mt-auto border-t border-stone-200/80 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 py-4 text-xs text-stone-500">
        <p>বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।</p>
        <p>সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।</p>
      </div>
    </footer>
  );
}
