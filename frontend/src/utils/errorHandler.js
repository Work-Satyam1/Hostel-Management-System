export const getErrorMessage = (error) => {
  if (!error) return 'An unexpected error occurred';

  // Network error or no response
  if (error.message === 'Network Error' || !error.response) {
    return 'Unable to reach the server. Please check your internet connection or backend server status.';
  }

  const status = error.response.status;
  const data = error.response.data;

  // Backend response message
  if (data && typeof data.message === 'string') {
    return data.message;
  }

  switch (status) {
    case 400:
      return 'Invalid request. Please check the entered data.';
    case 401:
      return 'Session expired or invalid credentials. Please log in again.';
    case 403:
      return 'Access denied. You do not have permission for this action.';
    case 404:
      return 'The requested resource was not found.';
    case 500:
    case 502:
    case 503:
      return 'Backend server error. Please try again later.';
    default:
      return `Request failed with status ${status}`;
  }
};

export default getErrorMessage;
