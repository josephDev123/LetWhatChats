export const createNewRoomDropDownVariant = {
  open: {
    opacity: 1,
    // y: [0, 10],
    scale: [0.5, 1],

    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.5,
      duration: 0.5,
    },
  },
  closed: {
    // scale: [1, 0],
    opacity: 0,
    y: -100,
    scale: 0.5,
    transition: {
      duration: 0.5,
      // exit: { scale: [1, 0.5, 0] },
      exit: { scale: [1, 0.5, 0], y: [-100, 0] },
    },
  },
};

export const itemVariant = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
};
