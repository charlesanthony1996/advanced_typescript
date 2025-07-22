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

