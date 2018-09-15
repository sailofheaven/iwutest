const checkBraces = (str) => {

    const stack = [];
    const parts = ['(', ')', '[', ']', '{', '}', '<', '>'];
    const len = str.length;
    
    let i = 0;
    let chr, ind;
    let result = true;

    while (i < len) {
        chr = str[i];
        ind = parts.indexOf(chr);
        i++;
        
        if (-1 === ind) continue;
        if (0 === ind % 2) {
            stack.push(chr);
        } else if (stack.length == 0 || stack.pop() != parts[ind - 1]) {
            result = false;
            break;
        }
    }

    return +!(result && !stack.length);
}

export { checkBraces as default }