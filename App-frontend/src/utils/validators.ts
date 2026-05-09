export const isValidGhanaPhone = (phone: string): boolean => {
  const ghanaRegex =
    /^(?:(?:\+233|0)(?:24|54|55|59|20|50|26|27|57|28|29)[0-9]{7})$/;
  return ghanaRegex.test(phone);
};

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPassword = (password: string): boolean => {
  return password.length >= 6;
};
