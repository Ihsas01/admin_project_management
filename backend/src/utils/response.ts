interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export const sendSuccess = <T>(
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): ApiResponse<T> => ({
  success: true,
  message,
  data
});

export const sendError = (
  error: string,
  message: string = 'Error occurred',
  statusCode: number = 500
): ApiResponse<null> => ({
  success: false,
  message,
  error
});