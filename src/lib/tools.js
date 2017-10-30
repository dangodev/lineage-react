const formatPrice = (price) => {
  const dollars = Math.floor(price / 100);
  const cents = price % 100;
  const centsPadded = cents < 10 ? `0${cents}` : cents;
  return `$${cents === 0 ? dollars : `${dollars}.${centsPadded}`}`;
};

export { formatPrice };
