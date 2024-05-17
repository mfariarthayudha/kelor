import Validator, { Rules } from "validatorjs";

export default (data: object, rules: Rules): Promise<typeof data> => {
  return new Promise((resolve, reject) => {
    Validator.useLang("id");

    const validator = new Validator(data, rules);

    if (validator.fails()) {
      let errorMessages: { [key: string]: string } = {};

      Object.entries(validator.errors.all()).forEach(([key, errorMessage]) => {
        errorMessages[key] = errorMessage[0];
      });

      return reject({
        code: "validation-fails",
        errorMessages: errorMessages,
      });
    }

    return resolve(data);
  });
};
