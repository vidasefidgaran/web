"use client";
import Modal from "../Modal";
import useTreeEditModal from "@/hooks/useTreeEditModal";
import Button from "@/@core/components/Button/index";
import { useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "@/@core/components/Form/FormField";
import { utmConvertor } from "@/lib/utils";
import Selection from "@/@core/components/Tabale/DashBoardTable";
import DatePicker from "@/@core/components/Form/FormField/Datepicker";
import usePrivateAxios from "@/lib/axios/usePrivateAxios";
import CodeStore from "@/store/CodeStore";
import MapComponent from "@/components/Map/map";
import axios from "axios";
import { Axios } from "@/lib/axios/axios";

interface TDefualtBases {
  baseTreeTypes: number;
  baseRegions: number;
  basePlantNatures: number;
  basePlantTypes: number;
  streets: number;
  baseTreeIrrigationTypes: number;
}
interface TBases {
  baseTreeTypes: { value: string; label: string }[];
  baseRegions: { value: string; label: string }[];
  basePlantNatures: { value: string; label: string }[];
  basePlantTypes: { value: string; label: string }[];
  streets: { value: string; label: string }[];
  baseTreeIrrigationTypes: { value: string; label: string }[];
}

enum STEPS {
  TreeInfo = 0,
  AdditionalInfo = 1,
}
const TreeEdit: React.FC = () => {
  const [isDisabledSecondary, setIsDisabledSecondary] = useState(false);
  const { isOpen, onClose, onOpen } = useTreeEditModal();
  const codeState = CodeStore();
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.TreeInfo);
  const AxiosPrivate = usePrivateAxios();
  const [bases, setBases] = useState<TBases>();
  const [center, setCenter] = useState<any>();
  const [isUsedIdSearch, setIsUsedIdSearch] = useState(false);
  // form init
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
      Address: null,
      ShamsiTreeDate: null,
      note: "بدون توضیحات",
      y: null,
      x: null,
      diameter: "",
      height: "",
      status: 1,
    },
  });
  const code = watch("Code");
  const y = watch("y");
  const x = watch("x");
  const baseTreeTypeId = watch("baseTreeTypeId");
  const BaseRegionId = watch("BaseRegionId");
  const basePlantTypeId = watch("basePlantTypeId");
  const baseTreeIrrigationTypeId = watch("baseTreeIrrigationTypeId");
  const basePlantNatureId = watch("basePlantNatureId");
  const ShamsiTreeDate = watch("ShamsiTreeDate");
  // custom fun to set value for form fields
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };
  useEffect(() => {
    if (step == STEPS.TreeInfo) {
      setIsDisabledSecondary(true);
    } else {
      setIsDisabledSecondary(false);
    }
  }, [step]);
  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };
  const [defualts, setDefualts] = useState<TDefualtBases>();

  useEffect(() => {
    async function getBases() {
      try {
        const req = await AxiosPrivate.get("/tree/getallbases");
        //@ts-ignore
        const mapToDesiredFormat = (array : any[], labelKey:string[]) =>
          array.map((obj) => ({
            value: `${obj.id}`,
            label: obj[labelKey],
          }));
        const desiredFormat = {
          baseTreeTypes: mapToDesiredFormat(
            req.data.payload.baseTreeTypes,
            "name"
          ),
          baseRegions: mapToDesiredFormat(req.data.payload.baseRegions, "name"),
          basePlantNatures: mapToDesiredFormat(
            req.data.payload.basePlantNatures,
            "name"
          ),
          basePlantTypes: mapToDesiredFormat(
            req.data.payload.basePlantTypes,
            "name"
          ),
          streets: mapToDesiredFormat(req.data.payload.streets, "name"),
          baseTreeIrrigationTypes: mapToDesiredFormat(
            req.data.payload.baseTreeIrrigationTypes,
            "name"
          ),
        };
        //@ts-ignore
        setBases(desiredFormat);
      } catch (error) {
        console.error("Failed to fetch bases:", error);
      }
    }
    getBases();
  }, []);
  useEffect(() => {
    if (codeState.info?.id) {
      setIsUsedIdSearch(true);
    }
    async function getBases() {
      try {
        //@ts-ignore
        const createDefultObject = (array:any[], labelKey:srring) =>
          array.map(
            (obj) =>
              ({
                value: `${obj.id}`,
                label: obj[labelKey],
              }.value)
          )[0];
        const defaultValues = {
          //@ts-ignore
          basePlantNatures: bases?.basePlantNatures.filter((item: any) => {
            return item.value == codeState.info?.BasePlantNatureId;
          })[0].value,
          //@ts-ignore
          baseTreeTypes: bases?.baseTreeTypes.filter((item: any) => {
            return item.value == codeState.info?.BaseTreeTypeId;
          })[0].value,
          //@ts-ignore
          baseRegions: bases?.baseRegions.filter((item: any) => {
            return item.value == codeState.info?.BaseRegionId;
          })[0].value,
          //@ts-ignore
          basePlantTypes: bases?.basePlantTypes.filter((item: any) => {
            return item.value == codeState.info?.BasePlantTypeId;
          })[0].value,
          //@ts-ignore
          streets: bases?.streets.filter((item: any) => {
            return item.value == codeState.info?.StreetId;
          })[0].value,
          //@ts-ignore
          baseTreeIrrigationTypes: bases?.baseTreeIrrigationTypes.filter(
            (item: any) => {
              return item.value == codeState.info?.BaseTreeIrrigationTypeId;
            }
          )[0].value,
        };
        setDefualts(defaultValues);
        if (codeState.info?.Code) {
          setCustomValue("Code", codeState.info?.Code);
        }
        setCustomValue("y", codeState.info?.Y);
        //@ts-ignore
        setCustomValue("x", codeState.info?.X);
        //@ts-ignore
        setCenter(utmConvertor(codeState.info?.X, codeState.info?.Y, "900913"));
        //@ts-ignore
        setCustomValue("diameter", codeState.info?.diameterheight);
        //@ts-ignore
        setCustomValue("height", codeState.info?.height);
        setCustomValue("id", codeState.info?.id ? codeState.info?.id : "");
        //@ts-ignore
        setCustomValue(
          "note",
          codeState.info?.Note ? codeState.info?.Note : "بدون توضیحات"
        );
        setCustomValue("ShamsiTreeDate", codeState.info?.ShamsiTreeDate);
      } catch (error) {
        console.error("Failed to fetch bases:", error);
      }
    }

    getBases();
  }, [codeState.info]);
  let form;

  if (step === STEPS.AdditionalInfo) {
    form = (
      <div className="grid grid-cols-1 sm:grid-cols-2 justify-center  items-center w-full gap-4 mb-4">
        {isUsedIdSearch && (
          <Input
            errors={errors}
            type="text"
            id="Code"
            register={register}
            label="کد درخت"
            disabled={isLoading}
            className="w-full border-neutral-400 border-1 text-neutral-600"
          />
        )}
        <Selection
          name="baseTreeTypeId"
          options={bases?.baseTreeTypes}
          control={control}
          defaultValue={defualts?.baseTreeTypes}
          id="baseTreeTypeId"
          label="نوع درخت"
          required
          className="w-full"
          isRtl={true}
        />

        <Selection
          name="basePlantTypeId"
          options={bases?.basePlantTypes}
          defaultValue={defualts?.basePlantTypes}
          control={control}
          id="basePlantTypeId"
          label="نوع پایه"
          required
          className="w-full"
        />
        <Selection
          defaultValue={defualts?.baseTreeIrrigationTypes}
          name="baseTreeIrrigationTypeId"
          options={bases?.baseTreeIrrigationTypes}
          control={control}
          id="baseTreeIrrigationTypeId"
          label="نوع آبیاری"
          required
          className="w-full"
        />
        <Selection
          name="basePlantNatureId"
          options={bases?.basePlantNatures}
          defaultValue={defualts?.basePlantNatures}
          control={control}
          id="basePlantNatureId"
          label="نوع طبیعت"
          required
          className="w-full ml-3"
        />

        <DatePicker
          control={control}
          label="تاریخ کاشت"
          name={"ShamsiTreeDate"}
        />
        {/* <Input errors={errors} type="text" id="Address" register={register} label="آدرس" disabled={isLoading} className="w-full border-neutral-400 border-1" /> */}
        <div className="w-full sm:w-full flex flex-row justify-between gap-2  ">
          <Input
            errors={errors}
            type="text"
            id="diameter"
            register={register}
            label="قطر درخت"
            disabled={isLoading}
            className="w-full border-neutral-400 border-1"
          />
          <Input
            errors={errors}
            type="text"
            id="height"
            register={register}
            label="ارتفاع"
            disabled={isLoading}
            className="w-full border-neutral-400 border-1"
          />
        </div>

        <Input
          errors={errors}
          type="text"
          id="note"
          register={register}
          label="یادداشت"
          disabled={isLoading}
          className="w-full border-neutral-400 border-1"
        />
      </div>
    );
  }
  if (step === STEPS.TreeInfo) {
    form = (
      <div className="relative flex flex-col sm:flex-row justify-between gap-4  h-full  ">
        <MapComponent
          className=" w-full min-w-[200px] h-[300px] sm:h-[200px]  my-auto shadow rounded-lg overflow-hidden "
          center={center}
          children={""}
        />
        <div className="w-full flex flex-col h-full gap-4">
          <div className="flex flex-row justify-center items-center mt-2 gap-1">
            <Selection
              name="BaseRegionId"
              options={bases?.baseRegions}
              control={control}
              id="RegionId"
              defaultValue={defualts?.baseRegions}
              label="منطقه"
              required
              className="w-full"
            />
            <Selection
              name="StreetId"
              options={bases?.streets}
              control={control}
              id="BaseTreeTypeId"
              defaultValue={defualts?.streets}
              label="خیابان"
              required
              className="w-full"
            />
          </div>
          <div className="w-full sm:w-full flex flex-row justify-between gap-2  ">
            <Input
              errors={errors}
              type="text"
              id="x"
              register={register}
              label="x"
              required
              disabled={isLoading}
              className="w-full text-sm border-1 border-neutral-200"
            />
            <Input
              errors={errors}
              type="text"
              id="y"
              register={register}
              label=" Y"
              required
              disabled={isLoading}
              className="w-full text-sm border-1 border-neutral-200"
            />
          </div>
          <Button
            onClick={() => {
              setCenter(utmConvertor(x, y, "900913"));
            }}
            text="موقعیت در نقشه"
            className="w-full bg-rose-400"
          ></Button>
        </div>
      </div>
    );
  }
  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    if (step == STEPS.AdditionalInfo) {
      setIsLoading(true);
      AxiosPrivate.put(`/Tree/${data.id}/updatetree`, data)
        .then((data: any) => {
          //@ts-ignore
          codeState.setInfo({});
          onClose();
          reset();
          setStep(STEPS.TreeInfo);
          toast.success("درخت با موفقیت ویرایش شد ");
        })
        .finally(() => {
          setIsLoading(false);
        })
        .catch((err) => {
          err.response.data.errors.map((item: string) => toast.error(item));
        });
    } else {
      setStep(STEPS.AdditionalInfo);
    }
  };
  const actionLabel = useMemo(() => {
    if (step === STEPS.AdditionalInfo) {
      return "ارسال اطلاعات";
    }

    return "مرحله ی بعد";
  }, [step]);
  let body = (
    <div className="flex flex-col justify-between h-full">
      {/* <Stepper steps={["اطلاعات مکانی", "اطلاعات درخت"]} currentState={step}  /> */}
      {form}
      <div className="flex flex-row justify-between items-end w-full   gap-3 h-[20%]">
        <Button
          onClick={onBack}
          text="برگشت"
          disabled={isDisabledSecondary}
          className="w-full bg-red-5 secondaryAction rounded-lg"
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          text={actionLabel}
          className="w-full rounded-lg "
          isLoading={isLoading}
        />
      </div>
    </div>
  );

  // const [isDisabledSecondary, setIsDisabledSecondary] = useState(false)
  // const [isRtl, setIsRtl] = useState(false);

  // const [options, setOptions] = useState([]);

  return (
    <Modal
      isOpen={isOpen}
      title="پلاک درختی"
      body={body}
      onSubmit={() => {
        console.log("");
      }}
      onClose={() => {
        setStep(STEPS.TreeInfo);
        //@ts-ignore
        codeState.setInfo({});
        reset();
        onClose();
      }}
    />
  );
};

export default TreeEdit;
