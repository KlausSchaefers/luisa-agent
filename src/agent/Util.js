export function mixin (element, parent) {
      for (let key in parent) {
          if (element[key] === undefined) {
              element[key] = parent[key]
          }
      }
  }