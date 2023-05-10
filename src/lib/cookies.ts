import Cookies from 'js-cookie';

// 쿠키 설정
export function setCookie(name: string, value: string, options?: any) {
  Cookies.set(name, value, options);
}

// 쿠키 가져오기
export function getCookie(name: string): string | undefined {
  return Cookies.get(name);
}

// 쿠키 삭제
export function removeCookie(name: string, options?: any) {
  Cookies.remove(name, options);
}