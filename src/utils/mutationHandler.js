export const validateInput = (data, requiredFields = []) => {
    for (const field of requiredFields) {
      if (data[field] === undefined || data[field] === null) {
        throw new Error(`Missing required field: "${field}"`);
      }
    }
  };
  
  export const createMutationHandler = ({ setSuccess, setError }) => {
    return async (mutationFn, data, successMsg, errorMsg, requiredFields = []) => {
      try {
        console.log(data)
        console.log(requiredFields)
        validateInput(data, requiredFields);
        const result = await mutationFn(data);
        setSuccess(successMsg);
        return result;
      } catch (err) {
        console.error(err);
        setError(`${errorMsg} (${err.message})`);
      }
    };
  };