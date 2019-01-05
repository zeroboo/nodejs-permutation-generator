'use strict';
const PermutationGenerator = function (source, size) {
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
PermutationGenerator.prototype.getSourceElements = function () {
    return this.sourceElements;
}
PermutationGenerator.prototype[Symbol.iterator] = function* () {
    let heapIndex = 0;
    let heapC = [];
    let heapSource = this.sourceElements.slice();
    
    this.debug("Iterate: ", heapSource, this.size);
    for (let i = 0; i < this.size; i++) {
        heapC.push(0);
    }

    let resultCount = 0;
    if (heapSource == null || heapSource.length == 0) {
        yield [];

    } else {
        yield heapSource.slice();
    }

    let newRes = null;
    while (heapIndex < this.size) {
        newRes = null;
        if (heapC[heapIndex] < heapIndex) {
            if (heapIndex % 2 == 0) {
                this.swapArray(heapSource, 0, heapIndex);
            }
            else {
                this.swapArray(heapSource, heapC[heapIndex], heapIndex);
            }
            newRes = heapSource.slice();
            heapC[heapIndex] += 1;
            heapIndex = 0;

        }
        else {
            heapC[heapIndex] = 0;
            heapIndex += 1;
        }
        if (newRes != null) {
            resultCount++;
            yield newRes;
        }
    }
    return resultCount;
};

PermutationGenerator.prototype.debug = function () {
    if (this.hasDebug) {
        console.log(arguments);
    }
}
PermutationGenerator.prototype.generateSingle = function () {

}
PermutationGenerator.prototype.copyArray = function () {

}
PermutationGenerator.prototype.swapArray = function (arr, srcIdx, desIdx) {
    var b = arr[desIdx];
    arr[desIdx] = arr[srcIdx];
    arr[srcIdx] = b;
}
PermutationGenerator.prototype.generateAll = function () {
    this.debug("generateAll", this.sourceElements, this.size);
    var results = [];
    var c = [];
    var source = this.sourceElements.slice();

    if (source == null || source.length == 0) {
        return results;
    }

    for (let i = 0; i < this.size; i++) {
        c.push(0);
    }
    results.push(source.slice());

    var i = 0;
    while (i < this.size) {
        if (c[i] < i) {
            if (i % 2 == 0) {
                this.swapArray(source, 0, i);
            }
            else {
                this.swapArray(source, c[i], i);
            }
            var newRes = source.slice();
            results.push(newRes);
            c[i] += 1;
            i = 0;
        }
        else {
            c[i] = 0;
            i += 1;
        }
    }
    return results;
}

PermutationGenerator.prototype.init = function () {
    this.returnSource = false;
    this.returnEmpty = false;
    this.heapIndex = 0;
    this.heapC = [];
    this.heapSource = this.sourceElements.slice();

    for (let i = 0; i < this.size; i++) {
        this.heapC.push(0);
    }
}

PermutationGenerator.prototype.getNextPermutation = function () {
    this.debug("getNextPermutation", this.size, this.heapC.length, this.heapIndex, this.returnEmpty, this.returnSource);
    if (this.heapSource == null || this.heapSource.length == 0) {
        if (!this.returnEmpty) {
            this.returnEmpty = true;
            return { value: [], done: false };
        }
        else {
            return { done: true };
        }

    }

    if (!this.returnSource) {
        this.returnSource = true;
        return { value: this.heapSource.slice(), done: false };
    }

    let newRes = null;
    while (this.heapIndex < this.size) {
        newRes = null;
        if (this.heapC[this.heapIndex] < this.heapIndex) {
            if (this.heapIndex % 2 == 0) {
                this.swapArray(this.heapSource, 0, this.heapIndex);
            }
            else {
                this.swapArray(this.heapSource, this.heapC[this.heapIndex], this.heapIndex);
            }
            newRes = this.heapSource.slice();
            this.heapC[this.heapIndex] += 1;
            this.heapIndex = 0;

        }
        else {
            this.heapC[this.heapIndex] = 0;
            this.heapIndex += 1;
        }
        if (newRes != null) {
            return { value: newRes, done: false };
        }
    }
    return { done: true };
}
PermutationGenerator.prototype.next = function () {
    this.debug("next", this.size, this.heapC.length, this.heapIndex, this.returnEmpty, this.returnSource);

    if (this.heapSource == null || this.heapSource.length == 0) {
        if (!this.returnEmpty) {
            this.returnEmpty = true;
            return { value: [], done: false };
        }
        else {
            return { done: true };
        }

    }

    if (!this.returnSource) {
        this.returnSource = true;
        return { value: this.heapSource.slice(), done: false };
    }

    let newRes = null;
    while (this.heapIndex < this.size) {
        newRes = null;
        if (this.heapC[this.heapIndex] < this.heapIndex) {
            if (this.heapIndex % 2 == 0) {
                this.swapArray(this.heapSource, 0, this.heapIndex);
            }
            else {
                this.swapArray(this.heapSource, this.heapC[this.heapIndex], this.heapIndex);
            }
            newRes = this.heapSource.slice();
            this.heapC[this.heapIndex] += 1;
            this.heapIndex = 0;

        }
        else {
            this.heapC[this.heapIndex] = 0;
            this.heapIndex += 1;
        }
        if (newRes != null) {
            return { value: newRes, done: false };
        }
    }
    return { done: true };
}
PermutationGenerator.prototype.generateAllPartial = function () {
    var results = [];
    var c = [];
    var source = this.sourceElements.slice();


    for (let i = 0; i < this.size; i++) {
        c.push(0);
    }
    results.push(source.slice(0, this.size));

    var i = 0;
    while (i < this.size) {
        if (c[i] < i) {
            if (i % 2 == 0) {
                this.swapArray(source, 0, i);
            }
            else {
                this.swapArray(source, c[i], i);
            }
            var newRes = source.slice(0, this.size);
            results.push(newRes);
            c[i] += 1;
            i = 0;
        }
        else {
            c[i] = 0;
            i += 1;
        }
    }
    return results;
}
/**
* @param input Array
* @param k Number
*/
PermutationGenerator.prototype.generateCombination = function (input, k) {
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
PermutationGenerator.prototype.getSubSet = function (input, subset) {
    var result = [];
    for (let i = 0; i < subset.length; i++) {
        result.push(input[subset[i]]);
    }
    return result;
}

PermutationGenerator.prototype.getSourceElementCount = function () {
    this.sourceElements.length;
}


module.exports = PermutationGenerator;
