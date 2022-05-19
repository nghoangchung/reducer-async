export interface PropsFrame {
  id: number; //local
  title: string; //local
  userID: string; //local
}
export interface PropsUser {
  //server
  user_id: string;
  user_name: string;
  user_role: string;
  user_token: string;
  //local
  /*
    For In the Future:
      - accountTypeId: server not at save, only save local.
      - In the future has login facebook, google...
  */
  accountTypeId: string;
  /*
    For user update app:
    - forceLogoutDataAtBuildNumber: server not at save, only save at local.
    - when use update app to new version,
    if data local conflict with new version then force logout.
  */
  forceLogoutDataAtBuildNumber: number;
  /*
    For develop change environment build:
      - environmentName: server not at save, only save at local.
      - if when develop change environment then force.
  */
  environmentName: string;
}
