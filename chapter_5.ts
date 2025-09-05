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

// function go(callback: (arg: string) => void) {
//     callback.apply(callbackFunction, ['Example argument'])
// }

// function callbackFunction(arg: string) {
//     // alert(arg)
//     console.log(arg)
// }

// go(callbackFunction)

// listing 5-11 simple function call 

function go(callback: (arg: string) => void) {
    callback('Example argument')
}

function callbackFunction(arg: string) {
    // alert(arg)
    console.log(arg)
}

go(callbackFunction)

// listing 5-12 using apply to convert array to arguments

const numbers = [3, 11, 5, 7, 2, 18]

// a fragile way of finding the maximum number
// const max = Math.max(numbers[0], numbers[1], numbers[2], numbers[3], numbers[4])

// a solid way to find the maximum
const max = Math.max.apply(null, numbers)

console.log(max)

// listing 5-13 simple observer

interface Subscriber {
    (message: string): void
}

class Publisher {
    private subscribers: Subscriber[] = []

    addSubscriber(subscriber: Subscriber) {
        this.subscribers.push(subscriber)
    }

    notify(message: string) {
        for (let subscriber of this.subscribers) {
            subscriber(message)
        }
    }
}

const publisher = new Publisher()

// using an arrow function
publisher.addSubscriber((message) => console.log('A: ' + message))

// using an inline function
publisher.addSubscriber(function (message) {
    console.log('B: ' + message)
})

publisher.notify('Test message')

// listing 5-14 fictitious api

interface fictitiousData {
    id: number
    name: string
}

class fictitiousAPI {
    static data: { [index: number]: fictitiousData} = {
        1: { id: 1, name: 'Aramis'},
        2: { id: 2, name: 'Athos'},
        3: { id: 3, name: 'Porthos'},
        4: { id: 4, name: 'D\Artagnan'}
    }

    static getData(id: number, callback: (data: fictitiousData) => void) {
        // simulating async data access with a timeout
        setTimeout(() => {
            const result = this.data[id]

            if (typeof result == 'undefined') {
                throw new Error('No matching record')
            }
            callback(result)
        }, 200)
    }
}

// listing 5-15 single call

fictitiousAPI.getData(1, function(data) {
    console.log(data.name)
})

// listing 5-16 error handling

try {
    fictitiousAPI.getData(4, function(data) {
        console.log(data.name)
    })
} catch (ex) {
    console.log('this statement is not reached, the error is not caught')
}

// listing 5-17 nested callbacks

fictitiousAPI.getData(1, (data) => {
    console.log(data.name)

    fictitiousAPI.getData(2, (data) => {
        if (data.name == 'Athos') {
            console.log(data.id + ' ' + data.name)
        } else {
            console.log(data.name)
        }

        fictitiousAPI.getData(3, (data) => {
            console.log(data.name)

            fictitiousAPI.getData(4, (data) => {
                console.log(data.name)

                // fictitiousAPI.getData(5, (data) => {
                //     console.log(data.name)
                // })
            })
        })
    })
})

// callbacks and error handling

// listing 5-18 fictitious api 2.0 

interface fictitiousData2 {
    id: number
    name: string
}

// class FictitiousAPI {
//     static data: { [index: number]: fictitiousData2 } = {
//         1: { id: 1, name: 'Aramis'},
//         2: { id: 2, name: 'Athos'},
//         3: { id: 3, name: 'Porthos'},
//         4: { id: 4, name: 'D\'Artagnan' },
//     }

//     static getData(id: number, callback: (error: string, data: fictitiousData2) => void) {
//         // simulating async data access with a timeout
//         window.setTimeout(() => {
//             const result = this.data[id]

//             if (typeof result == 'undefined') {
//                 callback('No matching record', null)
//                 return
//             }

//             callback(null, result)
//         }, 200)
//     }
// }

// listing 5-19 single call with error handling

// single call: Aramis

// fictitiousAPI.getData(1, function (error, data) {
//     if (error) {
//         console.log('Caught: ' + error)
//         return
//     }
//     console.log(data.name)
// })

// listing 5-22 fictitious api v3.0

interface fictitiousdata3 {
    id: number
    name: string
}

class fictitiousapi3 {
    static data: { [index: number]: fictitiousdata3} = {
        1: { id: 1, name: 'Aramis'},
        2: { id: 2, name: 'Athos'},
        3: { id: 3, name: 'Porthos'},
        4: { id: 4, name: 'D\'Artagnan' }
    }

    static getData(id: number) {
        return new Promise((fulfil: (data: fictitiousdata3) => void, reject: (reason: string) => void) => {
            // simulating async data access with a timeout
            setTimeout(() => {
                const result = this.data[id]

                if (typeof result == 'undefined') {
                    reject(('No matching record'))
                }

                fulfil(result)
            }, 200)
        })
    }
}

// listing 5-23 single call with then

// single call aramis
fictitiousapi3.getData(1)
.then(function (data) {
    console.log(data.name)
})

fictitiousapi3.getData(5)
.then(function (data) {
    console.log(data.name)
})
.catch(function (error) {
    console.log('Caught ' + error)
})

// listing 5-26 promise all

Promise.all([
    fictitiousapi3.getData(1),
    fictitiousapi3.getData(2),
    fictitiousapi3.getData(3),
    fictitiousapi3.getData(4),
    // fictitiousapi3.getData(1),
]).then((values) => {
    for (let val of values) {
        console.log(val.name)
    }
}).catch((error) => {
    console.log('Caught: ' + error)
})

// listing 5-27 fastest promise

Promise.race([
    fictitiousapi3.getData(1),
    fictitiousapi3.getData(2),
    fictitiousapi3.getData(3),
    fictitiousapi3.getData(4),
]).then((data) => {
    console.log(data.name)
}).catch((error) => {
    console.log('caught: ' + error)
})


// listing 5-28 xml http request

// const request = new XMLHttpRequest()

// request.onload = function() {
//     if (request.status != 200) {
//         console.log('Status code: ', request.status)
//         return
//     }

//     const data = JSON.parse(request.responseText)
//     console.log(data)
// }

// request.onerror = (error) => {
//     // network 
//     console.log('error making request: ', error)
// }

// request.open('get', './api/musketeers.json', true)
// request.send()

// listing 5-29 fetch api

fetch('./api/musketeers.json')
.then((response) => {
    if (response.status !== 200) {
        console.log('Status code: ', response.status)
        return
    }
}).then((data) => {
    console.log(data)
}).catch((error) => {
    console.log(error)
})

// listing 5-30 event listeners

class ClickLogger {
    constructor() {
        document.addEventListener('click', this.eventListener)
    }

    eventListener(e: Event) {
        const phase = e.eventPhase
        const tag = (<HTMLElement>e.target).tagName
        console.log("Click")
    }
}

// listing 5-31 cross browser events

function addEventCrossBrowser(element: any, eventName : any, listener: any) {
    if (element.addEventListener) {
        element.addEventListener(eventName, listener, false)
    } else if (element.attachEvent) {
        element.attachEvent('on' + eventName, listener)
    }
}

class ClickLogger1 {
    constructor() {
        addEventCrossBrowser(document, 'click', this.eventListener)
    }

    eventListener(e: Event) {
        const phase = e.eventPhase
        const tag = (<HTMLElement>e.target).tagName
        console.log('Click event detected on element ' + tag + 'by clicklogger')
    }
}

// const clickLogger = new ClickLogger()

// listing 5-33 custom events

// (function () {
//     function customEvent(event, params) {
//         params = params || { bubbles: false, cancelable: false, detail: undefined }
//         const evt = <any>document.createEvent('CustomEvent')

//         evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
//         return evt

//     }

//     CustomEvent.prototype = (<any>window).Event.prototype

//     (<any>window).CustomEvent = CustomEvent
// })()


// listing 5-34 extending the prototype

// NodeList.prototype.each = function (callback) {
//     for (let node of this) {
//         callback.call(node)
//     }
// }

// const getparagraphtext = function() {
//     console.log(this.innerHTML)
// }

// const paragraphs = document.querySelectorAll('p')
// paragraphs.each(getparagraphtext)

// listing 5-35 extending objects in typescript

// interface NodeList {
//     each(callback: () => any): void
// }

// NodeList.prototype.each = function(callback) {
//     for (let node of this) {
//         callback.call(node)
//     }
// }

// const getparagraphtext = function() {
//     console.log(this.innerHTML)
// }

// const paragraphs = document.querySelectorAll('p')
// paragraphs.each(getparagraphtext)


// listing 5-36 improved typescript object extensions

// interface NodeList {
//     each(callback: (element: HTMLElement) => any): void
// }

// interface NodeListOf<TNode extends Node> {
//     each(callback: (element: TNode) => any): void
// }

// NodeList.prototype.each = function (callback: (elem: HTMLElement) => any) {
//     for (let node of this) {
//         callback.call(node, node)
//     }
// }

// const getparagraphtext1 = function (elem: HTMLParagraphElement) {
//     console.log(elem.innerHTML)
// }


// listing 5-37 turning an extension into a polyfill

// if (!NodeList.prototype.each) {
//     NodeList.prototype.each = function(callback: (elem: HTMLElement)=> any) {
//         for (let node of this) {
//             callback.call(node, node)
//         }
//     }
// }

// sealing objects

// listing 5-38 extended instance