export function indexObjectList(data=[], field='id') {
    return data.reduce((itemByIndex, item) => {
      itemByIndex[item[field]] = item
      return itemByIndex
    }, {})
  }
  