const CombinationGenerator = function (source, size) {
    this.hasDebug = true;
    if (source === null) {
        throw new Error("Source is null");
    }
    if (source === undefined) {
        throw new Error("Source is undefined");
    }
    if (!Array.isArray(source)) {
        throw new Error("Source is not an array");
    }
    if (size === null || size == undefined) {
        size = source.length;
    }

    this.size = size;
    this.sourceElements = source.slice();
    
    this.init();
};

CombinationGenerator.prototype.generateAll = function (input, k) {
    var subsets = [];
    var s = [];                  // here we'll keep indices 
    // pointing to elements in input array

    if (k <= input.length) {
        // first index sequence: 0, 1, 2, ...
        for (let i = 0; ; i++) {
            s[i] = i;
            if (!((s[i] = i) < k - 1)) {
                break;
            }
        }
        subsets.push(this.getSubSet(input, s));
        for (; ;) {
            let i;
            // find position of item that can be incremented
            for (i = k - 1; i >= 0 && s[i] == input.length - k + i; i--);
            if (i < 0) {
                break;
            }
            s[i]++;                    // increment this item
            for (++i; i < k; i++) {    // fill up remaining items
                s[i] = s[i - 1] + 1;
            }
            subsets.push(this.getSubSet(input, s));
        }
    }
    return subsets;
}

CombinationGenerator.prototype.next() = function (input, k) {
    var subsets = [];
    var s = [];                  // here we'll keep indices 
    // pointing to elements in input array

    if (k <= input.length) {
        // first index sequence: 0, 1, 2, ...
        for (let i = 0; ; i++) {
            s[i] = i;
            if (!((s[i] = i) < k - 1)) {
                break;
            }
        }
        subsets.push(this.getSubSet(input, s));
        for (; ;) {
            let i;
            // find position of item that can be incremented
            for (i = k - 1; i >= 0 && s[i] == input.length - k + i; i--);
            if (i < 0) {
                break;
            }
            s[i]++;                    // increment this item
            for (++i; i < k; i++) {    // fill up remaining items
                s[i] = s[i - 1] + 1;
            }
            subsets.push(this.getSubSet(input, s));
        }
    }
    return subsets;
}
