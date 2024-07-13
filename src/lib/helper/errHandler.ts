// export default function errHandller(err: any) {
//   switch (err) {
//     case !err:
//       / "پیامی از سمت سرور  دریافت نشد";
//     case err?.response?.status == 409:
//       return "نام کاربری قبلا رزرو شده است";
//     default:
//       return "خطایی  در  ارسال ";
//   }
// }
export const uppercaseKeyConverter = (data: Record<string, any>): Record<string, any> => {
  const uppercaseKeys: Record<string, any> = {};
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      uppercaseKeys[key.charAt(0).toUpperCase() + key.slice(1)] = data[key];
    }
  }
  
  return uppercaseKeys;
};











//@ts-ignore



