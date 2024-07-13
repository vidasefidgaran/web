import React, { ReactElement, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
const index = ({
  items,
  resourcName,
  ItemComponent,
  className,
  activeItem,
}: {
  items: any[];
  resourcName: string;
  ItemComponent: any;
  className: string;
  activeItem: string;
}) => {
  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };
  return (
    <ul className={className }>
      <AnimatePresence>
        {items.map((item, i) => (
          <motion.li
            key={item.name}
            variants={variants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, y: 50 }}
            transition={{ delay: i * 0.1 }}
            
          >
            <ItemComponent
              {...{ [resourcName]: item }}
              isActive={item.name === activeItem}
            />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
};

export default index;


