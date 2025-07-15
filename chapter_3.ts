// listing 3 - 2 using and avoiding equivalence

// domainid type definition
type DomainID<T extends string> = {
    type: T,
    value: number
}

// CustomerId type
type customerid = DomainID<'CustomerId'>
const createcustomerid = (value: number): customerid => ({ type: 'CustomerId', value })

// console.log(createcustomerid)

type productid = DomainID<'productid'>
const createproductid = (value: number) : productid => ({ type: 'productid', value})


// example class
class example {
    static avoidaccidentalequivalence(id: customerid) {
        // imp
    }

    static useequivalence(id: number) {
        // imp
    }
}

var customerid = createcustomerid(1)
var productid = createproductid(3)

example.avoidaccidentalequivalence(customerid)

// supplied params do not match signature of the call target
// example.avoidaccidentalequivalence(productid)

example.useequivalence(customerid.value)

example.useequivalence(productid.value)

// type erasure

// listing 3-3

class orderedarray<T> {
    public items: T[] = []

    constructor(private comparer?: (a: T, b: T) => number) {

    }

    add(item: T): void {
        this.items.push(item)
        this.items.sort(this.comparer)
    }

    getitem(index: number): T | null | undefined {
        if (this.items.length > index) {
            return this.items[index]
        }
        return null
    }

    getitems(): T[] {
        return this.items
    }
}

var orderedarray1: orderedarray<number> = new orderedarray<number>()

// console.log(orderedarray1)
orderedarray1.add(3)
orderedarray1.add(5)

console.log(orderedarray1.items)
console.log(orderedarray1.getitems())

var firstitem: number | null | undefined = orderedarray1.getitem(0)
console.log(firstitem)

// listing 3-4 compiled js code

var orderedarray2 = (function () {
    function orderedarray(this: any, comparer: any) {
        this.comparer = comparer
        this.items = []
    }

    orderedarray.prototype.add = function (item: any) {
        this.items.push(item)
        this.items.sort(this.comparer)
    }

    orderedarray.prototype.getitem = function(index: any) {
        if (this.items.length > index) {
            return this.items[index]
        }
        return null
    }
    return orderedarray
}())

var orderedarray3 = new orderedarray()
orderedarray3.add(7)
orderedarray3.add(9)

console.log(orderedarray3.items)

var firstitem1 = orderedarray3.getitem(0)
console.log(firstitem1)


// listing 3-5

function add(a: number, b: number) {
    return a + b
}

interface classfunction {
    (cb: (result: string) => any): void
}

var callsfunction: classfunction = function (cb) {
    cb('Done')

    // error here. wrong type
    // cb(1)
}

// the result parameter is inferred to be a string
callsfunction(function (result) {
    return result
})

// best common type

// listing 3-6 best common types

// number []
let x = [0, 1, null]

// (string | number)
let y = [0, 1, null, 'a']

