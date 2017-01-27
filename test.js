import addContext from 'mochawesome/addContext';
import assert from 'power-assert';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';
import v8 from 'v8';

v8.setFlagsFromString('--max_old_space_size=500');

const script = fs.readFileSync('index.js').toString();


sinon.stub(console, 'log');

describe('Paiza Skill Tests', () => {


    beforeEach(function() {
        console.log.reset();
    });

    afterEach(function() {
        process.stdin.removeAllListeners('data');
        process.stdin.removeAllListeners('end');
        console.log.reset();
    });


    /*
     checkにテストケース、correctに正解をいれていく
     正解の末尾改行はcorrectに含まない(console.logで改行されるため)
     */

    it('test 1', function() {
        const check = ``;
        const correct = ``;

        equal(this, check, correct);
    });

    it('test 2', function() {
        const check = ``;
        const correct = ``;

        equal(this, check, correct);
    });


function equal(t, check, correct) {
    const filename = t.test.title.replace(/\s/g, '-') + '.js';
    try {
        fs.writeFileSync(filename, script);
        require(path.resolve('./', filename));
        process.stdin.emit('data', check);
        process.stdin.emit('end');
        assert.equal(getCalled(), correct);
        fs.unlinkSync(filename);
    } catch (e) {
        addContext(t, {
            title: e.name,
            value: e.stack
        });
        fs.unlinkSync(filename);
        throw e;
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