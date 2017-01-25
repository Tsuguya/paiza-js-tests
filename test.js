import test from 'ava';
import sinon from 'sinon';
import fs from 'fs';

const script = fs.readFileSync('index.js').toString();

sinon.stub(console, 'log');
let ignoreCallCount = 0;

test.beforeEach(t => {
    t.context.log = console.log;
    console.log.reset();
});

test.afterEach(() => {
    console.log.reset();
    process.stdin.removeAllListeners(['data', 'end']);
});

function equal(t, check, correct) {
    eval(script);
    process.stdin.emit('data', check);
    process.stdin.emit('end');
    t.is(getCalled(), correct);
    // resetきかない・・・
    ignoreCallCount = console.log.callCount;
}

/**
 * 呼ばれたconsole.logの内容を改行でくっつけて返す
 * @return {string}
 */
function getCalled() {
    let count = console.log.callCount - ignoreCallCount;
    console.info('ifnore: ', ignoreCallCount, 'callCount: ', console.log.callCount);
    const strs = [];
    for(let i = 0; i < count; i++) {
        strs.push(console.log.getCall(i).args[0]);
    }

    return strs.join('\n');
}

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