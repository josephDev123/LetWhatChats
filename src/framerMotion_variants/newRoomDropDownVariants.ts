export const createNewRoomDropDownVariant = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      // delayChildren: 0.5,
      // staggerChildren: 0.5,
      duration: 0.5,
    },
  },
  closed: {
    opacity: 0,
    scale: 0,
    transition: {
      // duration: 0.5,
      exit: { scale: 0 },
      // exit: { scale: [1, 0.5, 0], y: [-100, 0] },
    },
  },
};

export const itemVariant = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};
