// listing 5-1 queued timer

function test() {
    const testStart = performance.now()

    setTimeout(function() {
        console.log(performance.now() - testStart)
    }, 50)
}

// test()

// listing 5-2 queued timer delayed, waiting for the test method to finish

function test2() {
    const testStart2 = performance.now()

    setTimeout(function(){
        console.log(performance.now() - testStart2)
    }, 50)

    const start = +new Date()
    while (+new Date() - start < 100) {

    }
}

// test2()


// listing 5-3 c like scope

var scope = 1
{
    var scope = 2

    console.log('Inner: ' + scope)
}

// outer 1
console.log('Outer: ' + scope);

// listing 5-4 functional scope

// var scope = 1

(function () {
    var scope = 2

    console.log("Inner: " + scope)
}())

console.log("Outer: " + scope)

// listing 5-5 block level scope

const scope1 = 1

{
    const scope = 2

    // inner
    console.log("Inner: ", scope1)
}

// outer
console.log("Outer: ", scope)


// listing 5-6 down level compilation of block scoped variables

var scope = 1
{
    var scope_1 = 2
    // inner
    console.log('Inner: ' + scope_1)
}
console.log('Outer: ' + scope)

// listing 5-7 variable hoisting

function lemur() {
    // undefined, but technically available
    // console.log(kind)

    var kind = 'ruffed lemur'
}
lemur()

// listing 5-8 variable hoisting and global scope definition

var kind = 'ring tailed lemur'

// function lemur() {
//     // undefined, not ring tailed lemur
//     console.log(kind)

//     var kind = 'Ruffed lemur'
// }

lemur()

// listing 5-9 passing a function as an argument

// function go(callback: (arg: string) => void) {
//     callback.call(callbackFunction, 'Example argument')
// }

// function callbackFunction(arg: string) {
//     // alert(arg)
//     console.log(arg)
// }

// go(callbackFunction)

// listing 5-10 using apply

function go(callback: (arg: string) => void) {

}