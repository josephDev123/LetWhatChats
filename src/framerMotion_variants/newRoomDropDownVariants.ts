import { Variants } from "framer-motion";

export const createNewRoomDropDownVariant: Variants = {
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      delayChildren: 0.5,
      staggerChildren: 0.5,
    },
  },
  closed: {
    opacity: 0,
    scale: 0,
    transition: {
      duration: 0.4,
    },
  },
};

export const itemVariant: Variants = {
  closed: {
    opacity: 0,
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.6,
      // delay: 0.5,
    },
  },
};
