function print(str, color, bold) {
    var text = document.createTextNode(str),
        span = document.createElement('span'),
        output = document.getElementById('output');
    
    if (!output) {
        output = document.createElement('pre');
        output.id = 'output';
        var body = document.getElementsByTagName('body')[0];
        body.appendChild(output);
    }
    
    span.appendChild(text);
    if (color) {
        span.style.color = color;
    }
    if (bold) {
        span.style.fontWeight = 'bold';
    }
    output.appendChild(span);
}

function println(str, color, bold) {
    print(str + '\n', color, bold);
}

function assert(expr, message) {
    if (!expr) {
        throw new Error(message || 'Expected expr to be true');
    }
    assert.count++;
    return true;
}
assert.count = 0;

function testCase(name, tests) {
    assert.count = 0;
    var successful = 0,
        testCount = 0,
        hasSetup = typeof tests.setUp == 'function',
        hasTeardown = typeof tests.tearDown == 'function';
    
    for (var test in tests) {
        if (!/^test/.test(test)) {
            continue;
        }
        
        testCount++;
        
        try {
            if (hasSetup) tests.setUp();
            tests[test]();
            println(test, '#0c0');
            if (hasTeardown) tests.tearDown();
            successful++;
        } catch (ex) {
            println(test + ' failed: ' + ex.message, '#c00');
        }
    }
    
    var color = successful == testCount ? '#0c0' : '#c00';
    println(testCount + ' tests, ' + (testCount - successful) + ' failures', color, true);
}