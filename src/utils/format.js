// for format erros

export const formatValidationError = (errors) => {
    if(!errors || !errors.issues) return "Validation filed";
    if(Array.isArray(errors.issues)) return errors.issues.map(i => i.message).join(',');
    return JSON.stringify(errors)
}