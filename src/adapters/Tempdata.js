
export const Tempdata = (type) => {
  if (type === 'tide') {
    return {
      temp_data: true
    };
  } else {
    return {
      temp_data: true,
      loc: {
        long: 0,
        lat: 0
      }
    }
  }
}

export default Tempdata;

export const Temptidedata = {
  id: "9999999",
  temp_data: true
}
