export class perftester {
    constructor(private func: Function, private iterations: number) {

    }

    private runtest() {
        if (!performance) {
            throw new Error('The performance.now() standard is not supported in this runtime')
        }

        const errors: number[] = []

        const teststart = performance.now()

        for (let i = 0; i < this.iterations; i++) {
            try {
                this.func()
            } catch (err) {
                // limit the number of errors logged
                if (errors.length < 10) {
                    errors.push(i)
                }
            }
        }

        const testtime = performance.now() - teststart

        return {
            errors: errors,
            totalruntime: testtime,
            iterationaveragetime: (testtime / this.iterations)
        }
        
    }

    static run(func: Function, iterations = 10000) {
        const tester = new perftester(func, iterations)
        return tester.runtest()
    }
}