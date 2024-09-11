"use client";

import React, { useEffect, useState } from "react";
import AddMedicine from "../modals/add-medicine";

type Props = {};

const ModalProvider = (props: Props) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <>
      <AddMedicine />
    </>
  );
};

export default ModalProvider;
