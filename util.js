/** @fileoverview A collection of utility functions. */
module.exports = {
    //Converts UTC hours into CST hours
    //  @param {string} UTC A 2 digit number representing hours at UTC time
    //  @return {string} A 2 digit number representing the input UTC hours converted to central time
    getCST: function(UTC){
        let offsetHour = parseInt(UTC) - 6;
        let CST = offsetHour >= 0 ? offsetHour : offsetHour + 24;
        
        return ('0' + CST).substr(-2);
    },
    
    //Gets the element from a sorted list closest to the given element. 
    //  @param {object} elem The given object to be compared for similarity against
    //  @param {object[]} list The sorted list to be searched for the most similar element
    //  @param {function} compare The comparison function
    //    @param {object} elem1 The first element to be compared
    //    @param {object} elem2 The second element to be compared
    //    @return {number} A negative value if elem1 comes before elem2 otherwise a positive value
    //  @param {object} lastComparison Only used in recursive calls
    //  @param {number} offset Only used in recursive calls
    //  @return {object} The index of the most similar element in list to elem
    getClosestIndex(elem, list, compare, lastComparison = {"comparison": Infinity, "idx": null, "offset": 0}, offset = 0){
        if(!list.length){
            throw new Error('Cannot find closest element from empty list.');
        }
        
        let midpoint = Math.floor(list.length / 2),
            currentComparison = {
                "comparison": compare(elem, list[midpoint]),
                "idx": midpoint,
                "offset": offset
            };
        
        if(Math.abs(lastComparison.comparison) < Math.abs(currentComparison.comparison)){
            return lastComparison.idx + lastComparison.offset;
        }
        
        let newList;
        
        if(currentComparison.comparison < 0){
            newList = list.slice(0, midpoint);
        } else {
            offset += midpoint + 1;
            newList = list.slice(midpoint + 1, list.length);
        }
        
        if(!newList.length){
            return midpoint + offset - 1;
        }
        
        return this.getClosestIndex(elem, newList, compare, currentComparison, offset);
    },
    
    //Gets the number of days between 2 dates
    //  @param {Date} date1 A valid date
    //  @param {Date} date2 A valid date
    //  @return {number} The number of days between date1 and date2. A negative number if date2 came before date1.
    getDaysBetween(date1, date2){
        return (date2 - date1) / (1000 * 60 * 60 * 24);
    },
    
    //Picks a random element out of an array
    //  @param {array} arr An array to pick random elements from
    //  @return {object} The element from arr chosen at random
    pickRandom(arr){
        if(arr.length === 0){
            throw new Error('Cannot pick random member of empty array');
        }
        
        return arr[Math.floor(Math.random() * arr.length)];
    },
    
    //Validates that each member of an object isn't null
    //  @param {object} object The javascript object to be validated
    //  @param {string} path The key path up to object. Used for recursive calls. Initially ''
    //  @throws {Error} An error on discovering a member of an object has value NaN null or undefined.
    validateNotNull: function(object, path){
        for(let key in object){
            const value = object[key];
            
            if(typeof value === 'object'){
                let newPath = (`${path}.${key}`[0] === '.') ? key : `${path}.${key}`;
                this.validateNotNull(value, newPath);
            } else if(value === undefined || value === null || value === NaN){
                throw new Error(`Member ${path}.${key} of object is ${value}`);
            }
        }
    }
}