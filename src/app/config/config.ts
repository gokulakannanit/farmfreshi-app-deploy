const PATTERN = {
  emailOrPhone: new RegExp(
    /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|[6-9]{1}[0-9]{9})$/
  ),
  otp: new RegExp(/\d{4}$/),
};

const ERROR_MSG = {
  PASSWORD_SENT: 'Sending password failed, please try again.',
  USER_ALREADY_REGISTER:
    'User is already registered try with different value or click login..',
  SENDING_OTP: 'Something went wrong while sending OTP',
  COMMON: 'Something went wrong, try after some time',
  OTP_NOT_MATCHING: 'OTP is not matching',
  REGISTER: 'Something went wrong, try again later.',
  LOG_IN: 'Username, password not matching or access restricted.',
};

const SUCCESS_MSG = {
  ORDER_CANCEL: 'Order cancelled Successfully',
  ORDER_PLACED: 'Order Placed Successfully.',
  EMPLOYEE_UPDATED: 'Employee updated successfully',
  EMPLOYEE_ADDED: 'Employee created successfully',
  PROFILE_UPDATE: 'Profile updated successfully.',
  UPDATE_CITY: 'City updated successfully.',
  ADDED_CITY: 'City added successfully.',
  STOCK_ADDED: 'Stock added successfully',
  DELIVERED: 'Thanks for making delivery successfull.',
  UPDATE_STORE: 'Store updated successfully.',
  ADDED_STORE: 'Store added successfully.',
  ADDED_PRODUCT: 'Successfully added Product.',
  UPDATE_PRODUCT: 'Successfully updated Product.',
  LOG_OUT: 'Logged out successfully',
  OTP_SENT: 'One time password sent successfully',
  PASSWORD_SENT: 'Password sent successfully to your registered mobile',
  OTP_VERIFIED: 'One time password verified successfully',
  LOG_IN: 'Logged in successfully.',
  NEW_PIN: 'New PIN set successfully',
  REGISTER: 'Registerd successfully.',
  ADDRESS_ADDED: 'Address added',
  PRESENT_STATUS_UPDATED: 'Present status updated successfully.',
};

export { SUCCESS_MSG, ERROR_MSG, PATTERN };
