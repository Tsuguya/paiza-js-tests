import test from 'ava';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import v8 from 'v8';

v8.setFlagsFromString('--max_old_space_size=500');

const script = fs.readFileSync('index.js').toString();

sinon.stub(console, 'log');

test.beforeEach(t => {
    t.context.log = console.log;
    console.log.reset();
});

test.afterEach(() => {
    console.log.reset();
});

/*
checkにテストケース、correctに正解をいれていく
正解の末尾改行はcorrectに含まない(console.logで改行されるため)
 */

test('test 1', t => {
    const check = ``;
    const correct = ``;

    equal(t, check, correct);
});

test('test 2', t => {
    const check = ``;
    const correct = ``;

    equal(t, check, correct);
});


function equal(t, check, correct) {

    const filename = t.title.replace(/\s/g, '-') + '.js';
    fs.writeFileSync(filename, script);

    try {
        require(path.resolve('./', filename));
        process.stdin.emit('data', check);
        process.stdin.emit('end');
        t.is(getCalled(), correct);
    } catch (e) {
        throw e;
    } finally {
        process.stdin.removeAllListeners('data');
        process.stdin.removeAllListeners('end');
        fs.unlinkSync(filename);
    }
}

/**
 * 呼ばれたconsole.logの内容を改行でくっつけて返す
 * @return {string}
 */
function getCalled() {
    const strs = [];
    for(let i = 0; i < console.log.callCount; i++) {
        strs.push(console.log.getCall(i).args[0]);
    }

    return strs.join('\n');
}