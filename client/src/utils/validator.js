export const checkEmail = (email) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true;
    }
    return false;
  };
  export const checkPassword = (password) => {
    return password.length >= 8;
  };
  export const checkConfirmPassword = (password, cpassword) => {
    return password === cpassword;
  };
  export const checkPhoneNumber = (phone) => {
    var phoneno = /^\d{10}$/;
    if (phone.match(phoneno)) {
      return true;
    } else {
      return false;
    }
  };
  export const checkQuantity = (quantity) => {
    return quantity >= 5;
  };
  