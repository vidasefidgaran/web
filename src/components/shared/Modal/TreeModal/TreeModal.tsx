'use client';

import Modal from '../Modal';
import MapComponent from '@/components/Map';
import IconShare from "/public/icons/ShareIcon.svg"
import LocationIcon from "/public/icons/LocationIcon.svg"
import useTreeModal from '@/hooks/useTreeModal';
import CodeStore from '@/store/CodeStore';
const TreeModal = () => {
    const { isOpen, onClose, onOpen, data } = useTreeModal()
    const { info } = CodeStore()
    const body = (
        <div className="body  w-full  ">
            <div className="bg-primary  mb-3  pt-2 pb-12 rounded-md text-black text-base flex flex-col gap-3 relative  ">
                <div className='bg-neutral-300 flex flex-col   h-[300px] w-full justify-center items-center rounded-xxl'>
                    <svg _ngcontent-kij-c198="" width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><path _ngcontent-kij-c198="" d="M34.6022 17.8148H38.7111C40.4636 17.8148 41.8889 19.2544 41.8889 21.0247V36.5123C41.8889 38.2826 40.4636 39.7222 38.7111 39.7222H13.2889C11.5363 39.7222 10.1111 38.2826 10.1111 36.5123V21.0247C10.1111 19.2544 11.5363 17.8148 13.2889 17.8148H17.3977L21.6989 13.4702C21.8462 13.3209 22.0212 13.2025 22.214 13.1218C22.4068 13.0411 22.6135 12.9997 22.8222 13H29.1778C29.3864 12.9997 29.5931 13.0411 29.7859 13.1218C29.9787 13.2025 30.1538 13.3209 30.3011 13.4702L34.6022 17.8148Z" stroke="#A6A6A6" stroke-width="2"></path><ellipse _ngcontent-kij-c198="" cx="26" cy="27.4444" rx="6.5" ry="6.5" fill="#A6A6A6"></ellipse></svg>
                    <h3 className='text-neutral-600 font-bold'>تصویری برای درخت ثبت نشده </h3>
                </div>

                <div>
                    <label>عنوان:</label>
                    <p className="inline pr-1 " >{info?.BaseTreeNatureName}  </p>
                </div>
                <div>
                    <label>آدرس:</label>
                    <p className="inline pr-1 ">{info?.Address}</p>
                </div>

                <div className=" w-full grid grid-cols-2  sm:grid-cols-3 gap-y-2 ">
                    <div className="flex-grow" >
                        <label>کد:</label>
                        <p className="inline pr-1 " >{info?.Code} </p>
                    </div>
                    <div className="flex-grow" >
                        <label>منطقه :</label>
                        <p className="inline pr-1 " >{info?.BaseRegionName} </p>
                    </div>
                    <div className="flex-grow" >
                        <label>نوع:</label>
                        <p className="inline pr-1 ">{info?.BaseTreeTypeName}  </p>
                    </div>
                    <div className="flex-grow">
                        <label>قطر:</label>
                        <p className="inline pr-1 " > {info?.Diameter}  </p>
                    </div><div className="flex-grow">
                        <label>ارتفاع  :</label>
                        <p className="inline pr-1 " >{info?.Height}  </p>
                    </div>
                    <div className="flex-grow" >
                        <label>نوع آبیاری:</label>
                        <p className="inline pr-1 " >{info?.BaseTreeIrrigationTypeName}  </p>
                    </div>


                </div>

            </div>

        </div>





    )
    return (
        <Modal
            isOpen={isOpen}
            title="پلاک درختی"
            body={body}

            SecoundaryIconComponent={<IconShare />}
            onSubmit={() => { console.log("dsd") }}
            onClose={() => { onClose() }}
        />
    );
}

export default TreeModal;