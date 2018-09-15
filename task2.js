const deepCopy = (item) => {
    
    if (!item) { return item; }

    let copy;

    if (item instanceof Array) {
        copy = item.map(deepCopy);
    } else if (item instanceof Date) {
        copy = new Date(item);
    } else if (item instanceof Object) {
        if ('object' === typeof item) {
            copy = item;
        } else {
            copy = {};
            for (let key in item) {
                copy[key] = deepCopy(item[key]);
            }
        }
    } else {
        copy = item;
    }

    return copy;
}


export { deepCopy as default }