"use client";
import Button from "@/@core/components/Button/index";
import React, { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import "./style.css";
import Input from "@/@core/components/Form/FormField";
import QRScanner from "@/@core/components/QrScanner";
import { Spinner, Tab, Tabs } from "@nextui-org/react";
import CodeStore from "@/store/CodeStore";
import { Axios } from "@/lib/axios/axios";
import MapComponent from "@/components/Map/map";
import WMSFeature from "@/components/Map/WMSFeature";
import useTreeEditModal from "@/hooks/useTreeEditModal";

enum STEPS {
  TreeCode = 0,
  TreeInfo = 1,
  AdditionalInfo = 2,
}
interface TreeInfo {
  Id: string;
  [key: string]: any;
}
const Dashboard: React.FC = () => {
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  const codeState = CodeStore();
  const [qrscan, setQrscan] = useState<string>("No result");
  const { onOpen } = useTreeEditModal();
  const handleScan = (data: string) => {
    handleSearchByCode(data);
  };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    control,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      Code: "",
    },
  });

  const code = watch("Code");
  const handleSearchByCode = async (code: string) => {
    setIsLoading(true);
    await Axios.get(`/Tree/code/${code}`)
      .then((response) => {
        const uppercaseKeys: TreeInfo = {} as TreeInfo;
        for (let key in response.data) {
          uppercaseKeys[key.charAt(0).toUpperCase() + key.slice(1)] =
            response.data[key];
        }

        codeState.setInfo({ ...uppercaseKeys, id: uppercaseKeys.Id });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        err.response.data.errors.map((item: string) => toast.error(item));
        setError("Code", { type: "custom", message: "custom message" });
      });
  };
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await handleSearchByCode(data.Code);
  };
  useEffect(() => {
    if (codeState.info?.id) {
      onOpen();
    }
  }, [codeState.info]);

  let bodyContent = (
    <div className="flex flex-col justify-center items-center w-full  text-white">
      <Tabs
        aria-label="جستجو از طریق"
        className=""
        color="success"
        // Update the active tab when a tab is clicked
      >
        <Tab key="code" title="کد درخت">
          <form className="flex flex-col gap 5 justify-center items-center">
            <Input
              errors={errors}
              type="text"
              id="Code"
              register={register}
              className="border-1 border-neutral-300 text-neutral-500 mb-2 "
              label="کد درخت"
              required
            />
            <Button
              onClick={handleSubmit(onSubmit)}
              isLoading={codeState.isLoading}
              className="w-full bg-secondary-500"
              text=" جستجوی درخت "
            />
          </form>
        </Tab>
        <Tab key="map" title="نقشه">
          <MapComponent className="  w-[320px]  h-[390px]   my-auto shadow rounded-lg overflow-hidden map-component-ol">
            <WMSFeature />
            {codeState.isLoading === true && (
              <div className="absolute left-[50%] top-[50%]   -translate-x-[50%]  -translate-y-[50%]  z-50">
                <Spinner size="lg" color="success" />
              </div>
            )}
          </MapComponent>
        </Tab>
        <Tab key="scan" title="اسکن">
          <QRScanner
            //@ts-ignore
            handleScan={handleScan}
            className="w-full  max-w-[500px] mx-auto my-3 max-h-[500px] rounded-lg overflow-hidden"
          />
        </Tab>
      </Tabs>
    </div>
  );
  return (
    <>
      <div className="h-full flex flex-col justify-between mt-5">
        {bodyContent}
      </div>
    </>
  );
};

export default Dashboard;
