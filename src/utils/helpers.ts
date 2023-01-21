import { _TFixTsAny } from '../typings';

export type Indexed<T = _TFixTsAny> ={
  [key in string]: T;
};

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  // eslint-disable-next-line no-restricted-syntax
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      // eslint-disable-next-line no-continue
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        // eslint-disable-next-line no-param-reassign
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        // eslint-disable-next-line no-param-reassign
        lhs[p] = rhs[p];
      }
    } catch (e) {
      // eslint-disable-next-line no-param-reassign
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as _TFixTsAny);

  return merge(object as Indexed, result);
}

export function isEqualString(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

type PlainObject<T = _TFixTsAny> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';
}

function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        // eslint-disable-next-line no-continue
        continue;
      }
      return false;
    }

    if (value !== rightValue) {
      return false;
    }
  }

  return true;
}

type StringIndexed = Record<string, _TFixTsAny>;

export function queryStringify(data: StringIndexed): string | never {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);

  return keys.reduce((result, key, index) => {
    const value = data[key];
    const endLine = index < keys.length - 1 ? '&' : '';

    if (Array.isArray(value)) {
      const arrayValue = value
        .reduce<StringIndexed>((resultArr, arrData, indArr) => ({
          ...resultArr,
          [`${key}[${indArr}]`]: arrData,
        }), {});

      return `${result}${queryStringify(arrayValue)}${endLine}`;
    }

    if (typeof value === 'object') {
      const objValue = Object.keys(value || {})
        .reduce<StringIndexed>((resultObj, objKey) => ({
          ...resultObj,
          [`${key}[${objKey}]`]: value[objKey],
        }), {});

      return `${result}${queryStringify(objValue)}${endLine}`;
    }

    return `${result}${key}=${value}${endLine}`;
  }, '');
}

export function debounce(callee: (...args: _TFixTsAny) => void, timeout: number) {
  let timer: NodeJS.Timeout | null = null;

  return function perform(...args: _TFixTsAny[]) {
    if (timer) return;
    timer = setTimeout(() => {
      callee(...args);

      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    }, timeout);
  };
}
