import moment from 'moment-timezone';
//const LOCAL_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'; // HH = 24h
const SERVER_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'; // HH = 24h
const SERVER_TIME_ZONE = 'Asia/Hong_Kong'; //https://gist.github.com/diogocapela/12c6617fc87607d11fd62d2a4f42b02a
export function isValid(dateTime: string): boolean {
  if (!dateTime) {
    return false;
  }
  try {
    return moment(dateTime).isValid();
  } catch (error) {
    console.log('### UtilDate.isValid error', error);
    return false;
  }
}
//MomentInput: Moment | Date | string | number | (number | string)[] | MomentInputObject | null | undefined;
export function toServerDateTime(dateTimeLocal: string): string {
  try {
    if (!isValid(dateTimeLocal)) {
      return '';
    }
    /*
      moment('2018-07-17 19:00:00', 'YYYY-MM-DD HH:mm:ss').tz('Asia/Hong_Kong').format()
      => "2018-07-17 20:00:00"
    */
    return moment(dateTimeLocal, SERVER_DATE_TIME_FORMAT)
      .tz(SERVER_TIME_ZONE)
      .format(SERVER_DATE_TIME_FORMAT);
  } catch (error) {
    console.log('### UtilDate.toServerDateTime', error);
    return '';
  }
}
export function toServerDateTimeCurrent(): string {
  try {
    return moment().tz(SERVER_TIME_ZONE).format(SERVER_DATE_TIME_FORMAT);
  } catch (error) {
    console.log('### UtilDate.toServerDateTimeCurrent', error);
    return '';
  }
}
export function toLocalDateTime(dateTimeSever: string): string {
  try {
    if (!isValid(dateTimeSever)) {
      return '';
    }
    /*
      moment.tz('2018-07-17 19:00:00', 'YYYY-MM-DD HH:mm:ss', 'Asia/Hong_Kong').format()
      => "2018-07-17 18:00:00"
    */
    return moment
      .tz(dateTimeSever, SERVER_DATE_TIME_FORMAT, SERVER_TIME_ZONE)
      .local()
      .format(SERVER_DATE_TIME_FORMAT);
  } catch (error) {
    console.log('### UtilDate.toLocalDateTime', error);
    return '';
  }
}
