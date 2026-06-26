"use client";

import { authClient } from "@/lib/auth-client";
import { Check, X, Crown } from "lucide-react";

export default function PricingPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  if (user?.isPremium) {
    return (
      <div className="flex justify-center py-20">
        <div className="rounded-2xl border p-8 text-center">
          <h2 className="text-3xl font-bold">
            Premium ⭐
          </h2>

          <p className="mt-2 text-default-500">
            You already have lifetime premium access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#622ad8]/10 to-[#a8258e]/10 px-4 py-2 text-sm font-medium text-[#622ad8]">
            <Crown size={16} />
            Premium Membership
          </span>

          <h1 className="mt-6 text-5xl font-bold">
            Upgrade Your Learning Journey
          </h1>

          <p className="mt-4 max-w-2xl mx-auto text-default-500">
            Unlock premium life lessons, create premium content,
            and enjoy lifetime access to exclusive features.
          </p>
        </div>

        {/* Price Card */}
        <div className="max-w-md mx-auto rounded-3xl border bg-background p-8 shadow-xl">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Premium Plan</h2>

            <div className="mt-6">
              <span className="text-6xl font-extrabold bg-gradient-to-r from-[#622ad8] to-[#a8258e] bg-clip-text text-transparent">
                ৳1500
              </span>

              <p className="mt-2 text-default-500">
                One-Time Payment • Lifetime Access
              </p>
            </div>

            <form action={'/api/subscription'} method="POST">
              <button
                type="submit"
                className="mt-8 w-full rounded-xl bg-gradient-to-r from-[#622ad8] to-[#a8258e] py-3 text-white font-semibold hover:opacity-90"
              >
                Upgrade To Premium
              </button>
            </form>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mt-20 overflow-x-auto rounded-3xl border">
          <table className="w-full">
            <thead>
              <tr className="bg-default-100">
                <th className="p-5 text-left">Features</th>
                <th className="p-5 text-center">Free</th>
                <th className="p-5 text-center">Premium</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t">
                <td className="p-5">Create Lessons</td>
                <td className="text-center">10</td>
                <td className="text-center">Unlimited</td>
              </tr>

              <tr className="border-t">
                <td className="p-5">
                  Create Premium Lessons
                </td>
                <td className="text-center">
                  <X className="mx-auto text-red-500" />
                </td>
                <td className="text-center">
                  <Check className="mx-auto text-green-500" />
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-5">
                  Access Premium Lessons
                </td>
                <td className="text-center">
                  <X className="mx-auto text-red-500" />
                </td>
                <td className="text-center">
                  <Check className="mx-auto text-green-500" />
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-5">Ad-Free Experience</td>
                <td className="text-center">
                  <X className="mx-auto text-red-500" />
                </td>
                <td className="text-center">
                  <Check className="mx-auto text-green-500" />
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-5">
                  Priority Public Listing
                </td>
                <td className="text-center">
                  <X className="mx-auto text-red-500" />
                </td>
                <td className="text-center">
                  <Check className="mx-auto text-green-500" />
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-5">
                  Premium Creator Badge
                </td>
                <td className="text-center">
                  <X className="mx-auto text-red-500" />
                </td>
                <td className="text-center">
                  <Check className="mx-auto text-green-500" />
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-5">
                  Exclusive Community Access
                </td>
                <td className="text-center">
                  <X className="mx-auto text-red-500" />
                </td>
                <td className="text-center">
                  <Check className="mx-auto text-green-500" />
                </td>
              </tr>

              <tr className="border-t">
                <td className="p-5">Priority Support</td>
                <td className="text-center">
                  <X className="mx-auto text-red-500" />
                </td>
                <td className="text-center">
                  <Check className="mx-auto text-green-500" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-bold">
            Invest Once, Learn Forever
          </h3>

          <p className="mt-3 text-default-500">
            Get lifetime access to premium wisdom shared by the
            community.
          </p>
        </div>
      </div>
    </section>
  );
}