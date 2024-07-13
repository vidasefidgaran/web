"use client";
import Modal from "@/components/shared/Modal/Modal.tsx";
import IconShare from "/public/icons/ShareIcon.svg";
import TableComponent from "../../components/table/index";
import ModalStore from "../../store/ModalStore";
import { useEffect, useState } from "react";
const headers = ["Client / Invoice", "Amount", "Issued / Due", "Status"];
const types = {
  client_invoice: "image",
  amount: "text",
  issued_due: "text",
  status: "status",
  action: "action",
};

const data = [
  {
    client_invoice:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
    amount: "$20,000 USD",
    issued_due: "Sept 28, 2019 / Due in 3 days",
    status: { text: "Paid", color: "green" },
    action: () => alert("More options for Molly Sanders"),
  },
  {
    client_invoice:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
    amount: "$20,000 USD",
    issued_due: "Sept 28, 2019 / Due in 3 days",
    status: { text: "Paid", color: "green" },
    action: () => alert("More options for Molly Sanders"),
  },
  {
    client_invoice:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
    amount: "$20,000 USD",
    issued_due: "Sept 28, 2019 / Due in 3 days",
    status: { text: "Paid", color: "green" },
    action: () => alert("More options for Molly Sanders"),
  },
  {
    client_invoice:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
    amount: "$20,000 USD",
    issued_due: "Sept 28, 2019 / Due in 3 days",
    status: { text: "Paid", color: "green" },
    action: () => alert("More options for Molly Sanders"),
  },
  {
    client_invoice:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
    amount: "$214,000 USD",
    issued_due: "Sept 25, 2019 / Due in 6 days",
    status: { text: "Paid", color: "green" },
    action: () => alert("More options for Michael Roberts"),
  },
  {
    client_invoice:
      "https://images.unsplash.com/photo-1540845511934-7721dd7adec3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80",
    amount: "$20,000 USD",
    issued_due: "Sept 14, 2019 / Due in 2 weeks",
    status: { text: "Pending", color: "orange" },
    action: () => alert("More options for Devin Childs"),
  },
  {
    client_invoice:
      "https://images.unsplash.com/photo-1522609925277-66fea332c575?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&h=160&w=160&q=80",
    amount: "$12,000 USD",
    issued_due: "Sept 6, 2019 / Due 3 weeks ago",
    status: { text: "Overdue", color: "red" },
    action: () => alert("More options for Frederick Nicholas"),
  },
];
const AttributeModal = () => {
  const { openModal, setBody, isOpen } = ModalStore();
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    if (isOpen) setBody(body);
    openModal();
  }, [isOpen]);
  const handleSelect = (e, index) => {
    const newSelectedItems = [...selectedItems];
    if (e.target.checked) {
      newSelectedItems.push(index);
    } else {
      const itemIndex = newSelectedItems.indexOf(index);
      if (itemIndex > -1) {
        newSelectedItems.splice(itemIndex, 1);
      }
    }
    setSelectedItems(newSelectedItems);
  };
  const body = (
    <TableComponent
      headers={headers}
      data={data}
      types={types}
      onSelect={handleSelect}
    />
  );

  return null;
};

export default AttributeModal;
