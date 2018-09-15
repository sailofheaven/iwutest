function func(s, a, b) {

    if (s.match(/^$/)) { return -1; }

    let i = s.length;
    let index = -1;

    while (i--) {
        if (-1 !== [a, b].indexOf(s[i])) {
            index = i
            break;
        }
    }
    return index;
}

function func1(s, a, b) {
    return "[object String]" === Object.prototype.toString.call(s)
        ? Math.max(s.lastIndexOf(a), s.lastIndexOf(b))
        : -1;
}