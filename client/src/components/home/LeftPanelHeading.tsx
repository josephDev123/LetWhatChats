import { FaRegPenToSquare } from "react-icons/fa6";
import { BsFilter } from "react-icons/bs";
import { useState } from "react";
import CreateNewRoomDropDown from "./CreateNewRoomDropDown";
import FilterDropDown from "./FilterDropDown";

export default function LeftPanelHeading() {
  const [toggleCreateNewRoomDropDown, setToggleCreateNewRoomDropDown] =
    useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  return (
    <section className="flex justify-between">
      <span className="text-xl font-semibold">Chats</span>
      <span className="flex gap-6 relative">
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
