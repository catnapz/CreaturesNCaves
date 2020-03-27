export const APP_NAME = 'ClientApp';

export enum QueryParamName {
  ReturnUrlParam = 'returnUrl',
  MsgParam = 'message'
};

export enum LogoutAction {
  LogoutCallback = 'logout-callback',
  Logout = 'logout',
  LoggedOut = 'logged-out'
};

export enum LoginAction {
  Login = 'login',
  LoginCallback = 'login-callback',
  LoginFailed = 'login-failed',
  SilentRenew = 'silentrenew',
  Profile = 'profile',
  Register = 'register'
};

const prefix = '/authentication';

export const ApplicationPaths = {
  DefaultLoginRedirectPath: '/',
  ApiAuthorizationClientConfigurationUrl: `/_configuration/${APP_NAME}`,
  ApiAuthorizationPrefix: prefix,
  Login: `${prefix}/${LoginAction.Login}`,
  LoginFailed: `${prefix}/${LoginAction.LoginFailed}`,
  LoginCallback: `${prefix}/${LoginAction.LoginCallback}`,
  SilentRenew: `${prefix}/${LoginAction.SilentRenew}`,
  Register: `${prefix}/${LoginAction.Register}`,
  Profile: `${prefix}/${LoginAction.Profile}`,
  LogOut: `${prefix}/${LogoutAction.Logout}`,
  LoggedOut: `${prefix}/${LogoutAction.LoggedOut}`,
  LogOutCallback: `${prefix}/${LogoutAction.LogoutCallback}`,
  IdentityRegisterPath: '/Account/Register',
  IdentityManagePath: '/Account/Manage'
};
