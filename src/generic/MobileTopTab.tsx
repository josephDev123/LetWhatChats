import { NavLink } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";

export default function MobileTopTab() {
  return (
    <section className="sm:hidden flex gap-6 items-center mt-4">
      <NavLink
        className={({ isActive }) => (isActive ? "border-b-2" : "")}
        to="/community"
      >
        <IoIosPeople className="text-2xl" />
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? "border-b-2" : "")}
        to="/chats"
      >
        Chats
      </NavLink>
      {/* <NavLink
        className={({ isActive }) => (isActive ? "border-b-2" : "")}
        to="/status"
      >
        status
      </NavLink> */}
      {/* <NavLink
        className={({ isActive }) => (isActive ? "border-b-2 " : "")}
        to="/calls"
      >
        Calls
      </NavLink> */}
    </section>
  );
}
