export const validatePhone = (phone) => {
  let phoneReg = /^\d{3}-\d{3}-\d{4}$/;
  return !phoneReg.test(phone.value);
};

export const validateEmail = (email) => {
  let emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return !emailReg.test(email.value);
};
