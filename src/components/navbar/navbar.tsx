import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Navbar() {
  return (
    <nav>
      <MobileNavbar />
      <DesktopNavbar />
    </nav>
  );
}
