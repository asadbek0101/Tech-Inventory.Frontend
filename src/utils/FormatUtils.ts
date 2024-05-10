import qs from "qs";
import { toNumber, toString } from "lodash";
import { Dict } from "../api/AppDto";

const addDush = (number: string) => {
  if (number) {
    const _code = number?.substring(0, 2);
    const _first = number?.substring(2, 5);
    const _second = number?.substring(5, 7);
    const _thrid = number?.substring(7, 9);
    return _code + "-" + _first + "-" + _second + "-" + _thrid;
  } else {
    return "";
  }
};

export function formatCurrencyNumber(value: string | number = 0, fraction = 2): string {
  return toNumber(value)
    .toFixed(fraction)
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function formatLocationNumber(value: string): string {
  if (value) {
    const _str = value.replace(/[.,\s]/g, "");
    if (Boolean(Number(_str))) {
      const _firstStr = _str?.substring(0, 2);
      const _secondStr = _str?.substring(2, 8);
      const _resultStr = _firstStr + "." + _secondStr;
      return _resultStr;
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function formatPhoneNumber(str: string) {
  if (str) {
    const _phone = str?.replace(/\D/g, "");
    if (_phone && _phone?.length > 9) {
      const _removed = _phone?.substring(_phone?.length - 9);
      return addDush(_removed);
    } else if (_phone && _phone?.length === 9) {
      return addDush(_phone);
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export function formatCardNumber(value: string | number = 0): string {
  return toString(value).replace(/(?=(\d{4})+(?!\d))/g, " ");
}

export function parseSearch<TData = any>(search = ""): TData & Dict<string> {
  return qs.parse(search.replace("?", "")) as TData & Dict<string>;
}
