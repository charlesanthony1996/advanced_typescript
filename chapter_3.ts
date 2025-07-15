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

// console.log(orderedarray1.items)
// console.log(orderedarray1.getitems())

var firstitem: number | null | undefined = orderedarray1.getitem(0)
console.log(firstitem)