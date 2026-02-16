import React from "react";
import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import GuestLayout from "@/Layouts/GuestLayout";

export default function MainLayout({ children, ...rest }) {
  const { props } = usePage();
  const user = props?.auth?.user ?? null;

  const LayoutComponent = user ? AuthenticatedLayout : GuestLayout;

  return (
    <LayoutComponent user={user} {...rest}>
      {children}
    </LayoutComponent>
  );
}
