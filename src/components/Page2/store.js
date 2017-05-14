import {observable} from 'mobx'
export var test = observable({value: 1})
export function setTest (v) {
  test.value = v
  console.log(test, v)
}