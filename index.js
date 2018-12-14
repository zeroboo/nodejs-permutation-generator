'use strict';
const PermutationGenerator = function(source, size){

    if(source === null)
    {
        throw new Error("Elements is null");
    }
    if(size === null || size == undefined)
    {
        size = source.length;
    }
    this.size = size;
    this.sourceElements = source;
    const getSourceElements = function(){
        this.sourceElements;
    }
    
   
    
};
PermutationGenerator.prototype.next = function(){

}
PermutationGenerator.prototype.generateSingle = function(){
    
}
PermutationGenerator.prototype.copyArray = function(){
    
}
PermutationGenerator.prototype.swapArray = function(arr, srcIdx, desIdx){
    var b = arr[desIdx];
    arr[desIdx] = arr[srcIdx];
    arr[srcIdx] = b;
}
PermutationGenerator.prototype.generateAll = function(){
    var results = [];
    var c = [];
    var source = this.sourceElements.slice();
    

    for(let i=0;i<this.size;i++)
    {
        c.push(0);
    }
    results.push(source.slice(0, this.size));

    var i=0;
    while(i < this.size)
    {
        if(c[i]<i)
        {
            if(i%2 == 0)
            {
                this.swapArray(source, 0, i);
            }
            else{
                this.swapArray(source, c[i], i);
            }
            results.push(source.slice(0, this.size));
            c[i] += 1;
            i = 0;
        }
        else{
            c[i] = 0;
            i += 1;
        }
    }
    return results;
}


PermutationGenerator.prototype.getSourceElementCount = function(){
    this.sourceElements.length;
}
module.exports = PermutationGenerator;