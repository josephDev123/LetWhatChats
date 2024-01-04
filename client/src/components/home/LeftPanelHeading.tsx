import { FaRegPenToSquare } from "react-icons/fa6";
import { BsFilter } from "react-icons/bs";
import { useState } from "react";
import CreateNewRoomDropDown from "./CreateNewRoomDropDown";

export default function LeftPanelHeading() {
  const [toggleCreateNewRoomDropDown, setToggleCreateNewRoomDropDown] =
    useState(false);
  return (
    <section className="flex justify-between">
      <span className="text-xl font-semibold">Chats</span>
      <span className="flex gap-6 relative">
        <FaRegPenToSquare
          className="cursor-pointer "
          onClick={() => setToggleCreateNewRoomDropDown((prev) => !prev)}
        />
        {toggleCreateNewRoomDropDown && <CreateNewRoomDropDown />}
        <BsFilter className="cursor-pointer" />
      </span>
    </section>
  );
}
