export const isMobile = (str: string) => {
  return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str)
}

export const isEmail = (str: string) => {
  return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(str)
}
