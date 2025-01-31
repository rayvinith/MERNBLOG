// dekho bar bar error ka code repeat ho ra tha to wo nhi krna hoga ok 
export const errorHandler = (statusCode, message) => {
const error = new Error();
error.statusCode=statusCode;
error.message=message;
return error;
}