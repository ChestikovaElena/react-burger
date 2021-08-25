import { SECONDS_IN_MINUTE, MILLISECONDS_IN_SECOND } from "./constants";

export function setCookie(name, value, minutes) {
  let expires = "";
  if (minutes) {
    let date = new Date();
    date.setTime(date.getTime() + (minutes * SECONDS_IN_MINUTE * MILLISECONDS_IN_SECOND));
    expires = "; expires=" + date.toUTCString();
  }
  value = encodeURIComponent(value);
  const updatedCookie = name + '=' + value + expires + "; path=/";
  document.cookie = updatedCookie;
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}