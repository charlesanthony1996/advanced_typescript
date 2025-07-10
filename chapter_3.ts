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
