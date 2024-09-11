"use client";

import React from "react";
import { Button } from "../ui/button";
import { Handshake, Plus } from "lucide-react";
import { useModal } from "@/hooks/use-modal";

type Props = {};

const Navbar = (props: Props) => {
  const { onOpen } = useModal();
  return (
    <header className="flex justify-between items-center p-3 bg-slate-900 text-white">
      <p>
        <strong>بدائل</strong>
      </p>

      <div>
        <Button
          onClick={onOpen}
          size={"sm"}
          variant={"outline"}
          className="bg-transparent gap-1"
        >
          أضف دواء
          <Plus className="w-4 h-4" />
        </Button>
        {/* TODO: On click open how can I help dialog */}
        <Button
          size={"sm"}
          variant={"outline"}
          className="bg-transparent gap-1 ms-1"
        >
          للمساعدة
          <Handshake />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
