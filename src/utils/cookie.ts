import { SECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND } from "./constants";

export function setCookie(name: string, value: string | null, minutes: number) {
  let expires = "";
  if (minutes) {
    let date = new Date();
    date.setTime(date.getTime() + (minutes * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND));
    expires = "; expires=" + date.toUTCString();
  }
  value = (typeof value === "string") ? encodeURIComponent(value) : '';
  const updatedCookie = name + '=' + value + expires + "; path=/";
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name: string) {
  setCookie(name, null, -1);
}