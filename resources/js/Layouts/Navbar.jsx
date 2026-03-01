import { usePage } from "@inertiajs/react";
import GuestNavbar from "./GuestNavbar";
import AuthenticatedNavbar from "./AuthenticatedNavbar";

export default function Navbar() {
  const user = usePage().props.auth.user ?? null;
  return <>{user ? <AuthenticatedNavbar user={user} /> : <GuestNavbar />}</>;
}
