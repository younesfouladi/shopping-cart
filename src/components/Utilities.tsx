import { Spinner } from "flowbite-react";

export function LoadingSpinner() {
  return (
    <div className="fixed flex flex-col inset-0 bg-neutral-50 items-center justify-center">
      <Spinner aria-label="Loading Spinner" />
    </div>
  );
}
