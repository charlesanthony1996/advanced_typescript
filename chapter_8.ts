// listing 8-1 using the throw keyword

// function errorsonthree(input: number) {
//     if (input === 3) {
//         throw new Error("Three is not allowed")
//     }
//     return input
// }

// const result = errorsonthree(3)

// listing 8-2 custom error

class ApplicationError implements Error {
    public name = 'Application Error'

    constructor(public message: string) {
        if (typeof console !== 'undefined') {
            console.log(`Creating ${this.name} "${message}"`)
        }
    }

    toString() {
        return `${this.message}: {this.message}`
    }
}


// listing 8-3 using inheritance to create special exception types

class ApplicationError1 implements Error {
    public name = 'Application Error'

    constructor(public message: string) {
        if (typeof console !== 'undefined') {
            console.log(`Creating ${this.name} "${this.message}"`)
        }
    }

    toString() {
        return `${this.name}: {this.message}`
    }
}

class InputError extends ApplicationError {
}

function errorsOnThree(input: number) {
    if (input === 3) {
        throw new InputError('Three is not allowed')
    }
    return input
}

// const result = errorsOnThree(3)

// listing 8-4 unconditional catch block

// try {
//     const result = errorsOnThree(4)
// } catch (err) {
//     console.log('Error caught, no action here')
// }

// listing 8-5 checking the type of error

// try {
//     const result = errorsOnThree(3)
// } catch (err) {
//     if (err instanceof ApplicationError) {
//         console.log("Error caught, no action taken")
//     }
//     throw err
// }

// listing 8-6 asynchronous pattern

const sensorChange = function(reading: any) {
    const proximity = reading.near ? 'Near' : 'Far'
    console.log(proximity)
}

// window.addEventListener('userproximity', sensorChange, true)

// listing 8-7 imaginary unmanaged proximity sensor

// const sensorChange1 = function (reading) {
//     var proximity = reading.near ? 'Near' : 'Far'
//     console.log(proximity)
// }

// const readProximity = function() {
//     const sensor = new ProximitySensor()
//     try {
//         sensor.open()
//         const reading = sensor.read()
//         sensorChange1(reading)
//     } finally {
//         sensor.close()
//     }
// }

// window.setInterval(readProximity, 500)

// listing 8-8 unmanaged proximity sensor with promise like interface

const sensorChange1 = function(reading: any) {
    var proximity = reading.near ? 'Near' : 'Far'
    console.log(proximity)
}

// const readProximity = function () {
//     const sensor = new ProximitySensor()
//     // const sensor = new Date()

//     sensor.open()
//     .then(() => {
//         return sensor.read()
//     })
//     .then(() => {
//         sensorChange(reading)
//     })
//     .finally(() => {
//         sensor.close()
//     })
// }



// listing 8-9 calculating lines of communication

class communicationlines {
    calculate(teamSize: number) {
        return (teamSize * (teamSize - 1)) / 2
    }
}

function testcommunicationlines() {
    // console.log("hello")
    const communicationlines1 = new communicationlines()

    let result = communicationlines1.calculate(4)

    if (result !== 6) {
        throw new Error("Test failed for team size of 4")
    }

    result = communicationlines1.calculate(10)

    if (result !== 45) {
        throw new Error("Test failed for team size of 10")
    }
}

testcommunicationlines()

// listing 8-11 running the performance test

import { perftester } from './performance'


class communicationlines2 {
    calculate(teamsize: number) {
        return (teamsize * (teamsize - 1)) / 2
    }
}

function testcommunicationlines2() {
    const communicationlines = new communicationlines2()

    let result = communicationlines.calculate(4)

    if (result !== 6) {
        throw new Error("Test failed for team of size 4")
    }

    result = communicationlines.calculate(10)

    if (result !== 45) {
        throw new Error("Test failed for team of size 10")
    }
}

const result = perftester.run(testcommunicationlines2)
console.log(result.totalruntime + ' ms')

// listing 8-11 running the performance test

import { Performance } from './performance1'

class Communicationlines3 {
    calculate(teamsize: number) {
        return (teamsize * (teamsize - 1)) / 2
    }
}

function testcommunicationlines3() {
    const communicationlines = new Communicationlines3()

    let result = communicationlines.calculate(4)

    if (result !== 6) {
        throw new Error("Test failed for team size of 4")
    }

    result = communicationlines.calculate(10)

    if (result !== 45) {
        throw new Error('Test failed for team size of 10')
    }
}

const result4 = Performance.run(testcommunicationlines3)

console.log("the total time: ", result4.totalruntime + 'ms')

