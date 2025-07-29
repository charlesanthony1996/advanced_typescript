// listing 4-1 open recursion

import * as fs from 'fs'
import * as path from 'path'

interface FileItem {
    path?: string
    contents?: FileItem[]
}

class syncfilereader {
    getfiles(path: string, depth: number = 0) {
        const filetree = []

        const files = fs.readdirSync(path)

        for (let file of files) {
            const stats = fs.statSync(file)

            let fileitem: FileItem

            if (stats.isDirectory()) {
                fileitem = {
                    path: file,
                    contents: this.getfiles(file, (depth + 1))
                }
            } else {
                // add file
                fileitem = {
                    path: file,
                    contents: []
                }
            }
        filetree.push(fileitem)
        }
        return filetree
    }
}


class LimitedFileReader extends syncfilereader {
    constructor(public maxDepth: number) {
        super()
    }

    getfiles(path: string, depth = 0) {
        if (depth > this.maxDepth) {
            return []
        }
        return super.getfiles(path, depth)
    }
}

const filereader = new LimitedFileReader(1)
// const files = filereader.getfiles('path')
// console.log(filereader)

// listing 4-2
// encapsulation

class Totalizer {
    private total = 0
    private taxRateFactor = 0.2

    addDonation(amount: number) {
        if (amount <= 0) {
            throw new Error('Donation exception')
        }

        const taxRebate = amount * this.taxRateFactor
        const totalDonation = amount + taxRebate

        this.total += totalDonation
    }

    getAmountRaised() {
        return this.total
    }
}

const totalizer = new Totalizer()

totalizer.addDonation(100.00)

const fundsRaised = totalizer.getAmountRaised()

console.log(fundsRaised)

// listing 4-3 delegation

interface ControlPanel {
    startAlarm(message: string): any
}

interface Sensor {
    check(): any
}

class MasterControlPanel {
    private sensors: Sensor[] = []

    constructor() {
        this.sensors.push(new HeatSensor(this))
    }

    start() {
        for (let sensor of this.sensors) {
            sensor.check()
        }

        // window.setTimeout(() => this.start(), 1000)
        setTimeout(() => this.start(), 1000)

    }

    startAlarm(message: string) {
        console.log('Alarm! ' + message)
    }
}

class HeatSensor {
    private upperLimit = 38
    private sensor = {
        read: function() {
            return Math.floor(Math.random() * 100)
        }
    }

    constructor(private controlPanel: ControlPanel) {
    }

    check() {
        if (this.sensor.read() > this.upperLimit) {
            this.controlPanel.startAlarm('Overheating')
        }
    }
}

const controlPanel = new MasterControlPanel()

// controlPanel.start()

// listing 4-4 polymorphism

interface Vehicle {
    moveTo(x: number, y: number): void
}

// explicit interface implementation

class Car implements Vehicle {
    constructor() {
    }

    moveTo(x: number, y: number) {
        console.log('Driving to ' + x + ' ' + y)
    }
}

class SportsCar extends Car {

}

class Airplane {
    moveTo(x: number, y: number) {
        console.log('Flying to ' + x + ' ' + y)
    }
}

class Satellite {
    moveTo(x: number) {
        console.log('Targeting ' + x)
    }
}

function navigate(vehicle: Vehicle) {
    vehicle.moveTo(59.9437, 10.71874)
}


const car = new SportsCar()
navigate(car)

const airplane = new Airplane()
navigate(airplane)

const satellite = new Satellite()
navigate(satellite)

// listing 4-5 single responsibility principle 

// class Movie {
//     private db: DataBase

//     constructor(private title: string, private year: number) {
//         this.db = DataBase.connect('user:pw@mydb', ['movies'])
//     }

//     getTitle() {
//         return this.title + '(' + this.year + ')'
//     }

//     save() {
//         this.db.movies.save({ title: this.title, year: this.year })
//     }
// }

// const movie = new Movie('This Internship', 2013)

// movie.save()

// listing 4-6 seperating reasons for change

// class Movie {
//     constructor(private title: string, private year: number) {
//     }

//     getTitle() {
//         return this.title + '(' + this.year + ')'
//     }
// }

// class MovieRepository {
//     private db: Database;

//     constructor() {
//         this.db = Database.connect('user:pw@mydb', ['movies'])
//     }

//     save(movie: Movie) {
//         this.db.movies.save(JSON.stringify(movie))
//     }
// }

// const movie = new Movie('The internship', 2013)

// const movieRepository = new MovieRepository()

// movieRepository.save(movie)

// listing 4-7 open closed principle

class RewardPointsCalculator {
    getPoints(transactionValue: number) {
        return Math.floor(transactionValue) * 4
    }
}

class DoublePointsCalculator extends RewardPointsCalculator {
    getPoints(transactionValue: number) {
        const standardPoints = super.getPoints(transactionValue)
        return standardPoints * 2
    }
}

const pointsCalculator = new DoublePointsCalculator()
console.log(pointsCalculator.getPoints(100.2))


// listing 4-9 printer interface

// interface Printer {
//     copyDocument()
//     printDocument(document: Document)
//     stapleDocument(document: Document, tray: number)
// }

// abstract factory design pattern

// listing 4-13 wheel cleaning

interface WheelCleaning {
    cleanWheels(): void
}

class BasicWheelCleaning implements WheelCleaning {
    cleanWheels() {
        console.log('Soaping wheel')
        console.log('Brushing wheel')
    }
}

class ExecutiveWheelCleaning extends BasicWheelCleaning {
    cleanWheels() {
        super.cleanWheels()
        console.log('Waxing wheel')
        console.log('Rinsing wheel')
    }
}

// listing 4-14 body cleaning
interface BodyCleaning {
    cleanBody(): void
}

class BasicBodyCleaning implements BodyCleaning {
    cleanBody() {
        console.log('Soaping car')
        console.log('Rinsing car')
    }
}

class ExecutiveBodyCleaning extends BasicBodyCleaning {
    cleanBody() {
        super.cleanBody()
        console.log('Waxing car')
        console.log('Blow drying car')
    }
}


class CarWashProgram {
    constructor(private washLevel: number) {

    }

    runWash() {
        let wheelWash: WheelCleaning
        let bodyWash: BodyCleaning

        switch (this.washLevel) {
            case 1:
                wheelWash = new BasicWheelCleaning()
                wheelWash.cleanWheels()

                bodyWash = new BasicBodyCleaning()
                bodyWash.cleanBody()

                break

            case 2:
                wheelWash = new BasicWheelCleaning()
                wheelWash.cleanWheels()

                bodyWash = new ExecutiveBodyCleaning()
                bodyWash.cleanBody()

                break

            case 3:
                wheelWash = new ExecutiveWheelCleaning()
                wheelWash.cleanWheels()

                bodyWash = new ExecutiveBodyCleaning()
                bodyWash.cleanBody()

                break
        }
    }
}


// listing 4-16 abstract factory

interface ValetFactory {
    getWheelCleaning() : WheelCleaning
    getBodyCleaning() : BodyCleaning
}

// listing 4-17 concrete fantasies

class BronzeWashFactory implements ValetFactory {
    getWheelCleaning() {
        return new BasicWheelCleaning()
    }

    getBodyCleaning() {
        return new BasicBodyCleaning()
    }
}

class SilverWashFactory implements ValetFactory {
    getWheelCleaning() {
        return new BasicWheelCleaning()
    }

    getBodyCleaning() {
        return new ExecutiveBodyCleaning()
    }
}

class GoldWashFactory implements ValetFactory {
    getWheelCleaning() {
        return new ExecutiveWheelCleaning()
    }

    getBodyCleaning() {
        return new ExecutiveBodyCleaning()
    }
}

// listing 4-18 abstract pattern factory in use

class CarWashProgram2 {
    constructor(private cleaningFactory: ValetFactory) {

    }

    runWash() {
        const wheelWash = this.cleaningFactory.getWheelCleaning()
        wheelWash.cleanWheels()

        const bodyWash = this.cleaningFactory.getBodyCleaning()
        bodyWash.cleanBody()
    }
}


// listing 4-19 mixing enabler function

function applyMixins(derivedCtor: any, baseCtors: any[]) {
    baseCtors.forEach(baseCtor => {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
            derivedCtor.prototype[name] = baseCtor.prototype[name]
        })
    })
}

// example use below

class CanFly {
    fly() {
        console.log("Flying")
    }
}

class CanSwim {
    swim() {
        console.log("Swimming")
    }
}

class Animal {}

interface Animal extends CanFly, CanSwim {

}

applyMixins(Animal, [CanFly, CanSwim])

const duck = new Animal()
duck.fly()
duck.swim()


// listing 4-20 reusable classes

class Sings {
    sing() {
        console.log("Singing")
    }
}

class Dances {
    dance() {
        console.log("Dancing")
    }
}

class Acts {
    act() {
        console.log("Acting")
    }
}

// listing 4-21 composing classes

class Actor implements Acts {
    act!: () => void
}

applyMixins(Actor, [Acts])

class AllRounder implements Acts, Sings, Dances {
    act!: () => void
    dance!: () => void
    sing!: () => void
}

applyMixins(AllRounder, [Acts, Dances, Sings])

// listing 4-22 using the classes

const actor = new Actor()
actor.act()

const allRounder = new AllRounder()
allRounder.act()
allRounder.dance()
allRounder.sing()



// listing 4-23 properties not mapped

class Acts2 {
    public message = 'Acting'

    act() {
        console.log(this.message)
    }
}

class Actor2 implements Acts2 {
    public message!: string
    act!: () => void
}

applyMixins(Actor2, [Acts2])
const actor2 = new Actor2()


actor.act()

// listing 4-24 static properties are available

class Acts3 {
    public static message = 'Acting'

    act() {
        console.log(Acts3.message)
    }
}

class Actor3 implements Acts3 {
    act!: () => void
}

applyMixins(Actor3, [Acts3])

const actor3 = new Actor3()

actor3.act()


// listing 4-25 real mixins

type Constructor<T = {}> = new (...args: any[]) => T

function Acts4<TBase extends Constructor>(Base: TBase) {
    return class extends Base {
        message: string = 'Acting'
        act() {
            console.log(this.message)
        }
    }
}

class Person {
    constructor(private name: string) {
        
    }
}

