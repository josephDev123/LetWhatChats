import { FaRegPenToSquare } from "react-icons/fa6";
import { BsFilter } from "react-icons/bs";
import { useState } from "react";
import CreateNewRoomDropDown from "./CreateNewRoomDropDown";
import FilterDropDown from "./FilterDropDown";
// import { IoCameraOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function LeftPanelHeading() {
  const [toggleCreateNewRoomDropDown, setToggleCreateNewRoomDropDown] =
    useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);

  return (
    <section className="flex  items-center justify-between relative">
      <Link to="/" className="text-xl font-semibold ">
        LetWhatChats
      </Link>
      <span className="flex items-center sm:gap-6 gap-4 ">
        {/* <IoCameraOutline className="cursor-pointer text-xl sm:hidden" /> */}
        <CiSearch className="cursor-pointer text-xl sm:hidden" />
        <FaRegPenToSquare
          className="cursor-pointer"
          onClick={() => {
            if (openFilterModal) {
              setOpenFilterModal(false);
              setToggleCreateNewRoomDropDown((prev) => !prev);
            }
            setToggleCreateNewRoomDropDown((prev) => !prev);
          }}
        />

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

      {openFilterModal && (
        <FilterDropDown newRoomDropDownStatus={openFilterModal} />
      )}
      {toggleCreateNewRoomDropDown && (
        <CreateNewRoomDropDown
          newRoomDropDownStatus={toggleCreateNewRoomDropDown}
          closeModal={() => setToggleCreateNewRoomDropDown(false)}
        />
      )}
    </section>
  );
}
