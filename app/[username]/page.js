import React from "react";
import PaymentPage from "@/components/PaymentPage"; // Client component

export default function Page({ params }) {
   // extract the dynamic route param

  return <PaymentPage username={params.username} />;
}

export const metadata = {
  title: 'Get Me A Chai',
  description: 'Support username by buying them a chai. Your small contribution can make a big difference!',
}