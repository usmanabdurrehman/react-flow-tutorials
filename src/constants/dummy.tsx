export const ORDERS = [
  { id: "1", name: "Check Shirt" },
  { id: "2", name: "Alarm Clock" },
  { id: "3", name: "Mona Lisa" },
];

export const PAYMENT_PROVIDER_IMAGE_MAP: { [code: string]: string } = {
  St: "https://cdn.worldvectorlogo.com/logos/stripe-2.svg",
  Ap: "https://cdn.worldvectorlogo.com/logos/apple-14.svg",
  Gp: "https://cdn.worldvectorlogo.com/logos/google-g-2015.svg",
  Pp: "https://avatars.githubusercontent.com/u/476675?s=280&v=4",
  Am: "https://static.wixstatic.com/media/d2252d_4c1a1bda6a774bd68f789c0770fd16e5~mv2.png",
};

export const PAYMENT_PROVIDERS = [
  { id: "1", code: "St", name: "Stripe" },
  { id: "2", code: "Gp", name: "Google Pay" },
  { id: "3", code: "Ap", name: "Apple Pay" },
  { id: "4", code: "Pp", name: "Paypal" },
  { id: "5", code: "Am", name: "Amazon Pay" },
];
