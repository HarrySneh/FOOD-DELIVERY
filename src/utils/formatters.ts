export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-GH", {
    style: "currency",
    currency: "GHS",
  }).format(amount);
};

export const formatPhoneNumber = (phone: string) => {
  return phone.replace(/^(\d{3})(\d{3})(\d{4})$/, "$1 $2 $3");
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleString("en-GH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
