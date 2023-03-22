export let borderBottomTableStyle: any = (ifAdded: any) =>
  ifAdded
    ? {
        borderBottomColor: "coolGray.200",
        borderBottomStyle: "solid",
        borderBottomWidth: "1",
      }
    : {};

export let borderTableStyle: any = {
  borderRightStyle: "solid",
  borderRightColor: "coolGray.200",
  borderRightWidth: 1,
  justifyContent: "center",
  height: 9,
  ...borderBottomTableStyle(true),
};
