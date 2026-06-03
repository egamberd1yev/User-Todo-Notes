export const checkNumber = (phone) => {
  const phoneCode = /^\+998\d{9}$/;

  return phoneCode.test(phone)
}