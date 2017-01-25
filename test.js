import test from 'ava';
import sinon from 'sinon';
import fs from 'fs';

const script = fs.readFileSync('index.js').toString();

test.beforeEach(t => {
    t.context.log = console.log;
    sinon.stub(console, 'log');
});

test.afterEach(() => {
    console.log.restore();
    process.stdin.removeAllListeners(['data', 'end']);
});

/*
checkにテストケース、correctに正解をいれていく
正解の末尾改行はcorrectに含まない
 */


test('test 1', t => {
    const check = `A`;
    const correct = `A`;

    equal(t, check, correct);
});

test('test 2', t => {
    const check = `B
1 2 3 4 5
10 9 8 7 6`;
    const correct = `B
10 9 8 7 6
1 2 3 4 5`;

    equal(t, check, correct);
});


function equal(t, check, correct) {
    eval(script);
    process.stdin.emit('data', check);
    process.stdin.emit('end');
    t.is(getCalled(), correct);
}

/**
 * 呼ばれたconsole.logの内容を改行でくっつけて返す
 * @return {string}
 */
function getCalled() {
    let count = console.log.callCount;
    const strs = [];
    for(let i = 0; i < count; i++) {
        strs.push(console.log.getCall(i).args[0]);
    }

    return strs.join('\n');
}