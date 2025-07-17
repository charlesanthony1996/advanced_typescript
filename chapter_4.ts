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