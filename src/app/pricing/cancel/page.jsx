import Button from "@/components/reusable/Button";
import Link from "next/link";
import { FaTimes } from "react-icons/fa";

export default function Cancel() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl shadow-lg p-8 text-center border my-7">
        <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-full bg-red-500 text-white">
          <FaTimes size={20} />
        </div>

        <h1 className="mt-6 text-3xl font-bold">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-gray-400">
          Your payment was cancelled. No charges have been made to your account.
        </p>

        <div className="mt-4 p-3 rounded-lg border">
          <p className="text-sm text-gray-500">
            You can try upgrading again whenever you're ready.
          </p>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Link href="/pricing">
            <Button>
              Try Again
            </Button>
          </Link>

          <Link href="/">
            <Button variant="bordered">
              Back Home
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}