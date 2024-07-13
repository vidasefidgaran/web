"use client";
import QRScanner from "@/@core/components/QrScanner";
import Button from "@/@core/components/Button/index";
import QrIcon from "/public/icons/QrScanner.svg";
import ScanIcon from "/public/icons/scan.svg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LeftArrow from "/public/icons/arrow-left.svg";

const BarcodeScanner = () => {
  const router = useRouter();
  const [isValid, setIsValid] = useState(true);
  const [isEnable, setIsEnable] = useState(false);
  const [code, setCode] = useState();

  const handleButtonClick = () => {
    if (isValidCode(code)) {
      router.push(`/?TreeCode=${code}`);
    }
  };
  const handleScan = (code) => {
    router.push(`/?TreeCode=${code}`);
  };
  return (
    <div className="overflow-hidden h-screen  flex flex-col justify-center   items-center gap-7">
      <h1 className="text-4xl font-extrabold text-neutral-500">
        جستجوی <span className="text-primary-500">درخت</span>
      </h1>

      {isEnable ? (
        <QRScanner
          className="w-[300px] rounded-lg overflow-hidden "
          handleScan={handleScan}
        />
      ) : (
        <>
          <QrIcon />
          <Button
            onClick={() => {
              setIsEnable(true);
            }}
            className="btn-shadow p-3 rounded-xl bg-primary-400"
            IconComponent={<ScanIcon />}
            isShadow
            text="اسکن با دوربین"
          />
        </>
      )}
      <div className="flex flex-col justify-center items-center w-full max-w-[280px] gap-3">
        <hr className="w-full" />
        <p
          className="text-xl
         font-extrabold text-neutral-500  "
        >
          جستجو با
          <span className="text-primary-400 px-3">کد پستی</span>
        </p>
        <div className="w-full relative">
          <input
            onChange={(e) => setCode(e.target.value)}
            className="w-full  h-[56px] p-4  outline-none border-neutral-500 border rounded-2xl "
          />
          <button
            onClick={handleButtonClick}
            className="bg-primary-200 rounded-full h-[42px] w-[42px] absolute top-[6px] left-2 "
          >
            <LeftArrow className="m-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BarcodeScanner;
