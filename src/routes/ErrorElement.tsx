import { Link } from "react-router-dom";

export default function ErrorElement() {
  return (
    <div className="p-8 w-full h-full flex flex-col gap-8 items-center justify-center">
      <img src="/images/404.svg" alt="404 picture" />
      <Link
        to="/"
        className="bg-amber-600 text-neutral-50 font-bold py-4 px-6 rounded-full"
      >
        Home Page
      </Link>
    </div>
  );
}
