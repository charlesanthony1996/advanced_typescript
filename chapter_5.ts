// listing 5-1 queued timer

function test() {
    const testStart = performance.now()

    setTimeout(function() {
        console.log(performance.now() - testStart)
    }, 50)
}

test()

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

test2()


