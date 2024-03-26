import authenticationAPI from './authApi';

export const handleVerification = async (signUpData: any) => {
  const api = '/verification';
  try {
    const res = await authenticationAPI.HandleAuthentication(
      api,
      {email: signUpData.email},
      'post',
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const handleRegister = async (registerData: any) => {
  const api = '/register';
  try {
    const res = await authenticationAPI.HandleAuthentication(
      api,
      {email: registerData.email},
      'post',
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
};
