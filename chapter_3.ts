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
    private items: T[] = []

    constructor(private comparer?: (a: T, b: T) => number) {

    }

    add(item: T): void {
        this.items.push(item)
        this.items.sort(this.comparer)
    }

    getitem() {
        
    }
}