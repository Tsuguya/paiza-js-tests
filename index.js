process.stdin.resume();
process.stdin.setEncoding('utf8');
let input_string = '';

process.stdin.on('data', chunk => {
    input_string += chunk;
});

// こっからかいてく
process.stdin.on('end', () => {
    const lines = input_string.trim().split('\n');

    console.log(lines.join('\n'));

});
