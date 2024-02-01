import { FaRegPenToSquare } from "react-icons/fa6";
import { BsFilter } from "react-icons/bs";
import { useState } from "react";
import CreateNewRoomDropDown from "./CreateNewRoomDropDown";
import FilterDropDown from "./FilterDropDown";
import { IoCameraOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";

export default function LeftPanelHeading() {
  const [toggleCreateNewRoomDropDown, setToggleCreateNewRoomDropDown] =
    useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  return (
    <section className="flex  items-center justify-between">
      <span className="text-xl font-semibold">JoeWhatChats</span>
      <span className="flex items-center sm:gap-6 gap-4 relative">
        <IoCameraOutline className="cursor-pointer text-xl sm:hidden" />
        <CiSearch className="cursor-pointer text-xl sm:hidden" />
        <FaRegPenToSquare
          className="cursor-pointer "
          onClick={() => {
            if (openFilterModal) {
              setOpenFilterModal(false);
              setToggleCreateNewRoomDropDown((prev) => !prev);
            }
            setToggleCreateNewRoomDropDown((prev) => !prev);
          }}
        />
        {toggleCreateNewRoomDropDown && (
          <CreateNewRoomDropDown
            newRoomDropDownStatus={toggleCreateNewRoomDropDown}
          />
        )}

        {openFilterModal && (
          <FilterDropDown newRoomDropDownStatus={openFilterModal} />
        )}
        <BsFilter
          className="cursor-pointer"
          onClick={() => {
            if (toggleCreateNewRoomDropDown) {
              setToggleCreateNewRoomDropDown(false);
              setOpenFilterModal((prev) => !prev);
            }
            setOpenFilterModal((prev) => !prev);
          }}
        />
      </span>
    </section>
  );
}
