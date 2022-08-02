export const validateConditions = {
    fullName: /^([A-z]{3,30})\s([A-z]{3,30}$)/,
    phoneNumber: /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/gm,
    email: /\S+@\S+\.\S+/,
    message:  /^.{3,300}$/
};
