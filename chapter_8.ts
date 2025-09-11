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

const result = errorsOnThree(3)

