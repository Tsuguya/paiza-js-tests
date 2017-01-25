import test from 'ava';
import sinon from 'sinon';
import fs from 'fs';

const script = fs.readFileSync('index.js').toString();

sinon.stub(console, 'log');

test.beforeEach(t => {
    t.context.log = console.log;
    console.log.reset();
});

test.afterEach(() => {
    console.log.reset();
    process.stdin.removeAllListeners('data');
    process.stdin.removeAllListeners('end');
});

/*
checkにテストケース、correctに正解をいれていく
正解の末尾改行はcorrectに含まない
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
    const strs = [];
    for(let i = 0; i < console.log.callCount; i++) {
        strs.push(console.log.getCall(i).args[0]);
    }

    return strs.join('\n');
}