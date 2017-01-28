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
        this.currentTest.filename = this.currentTest.title.replace(/\s/g, '-') + '.js';
        fs.writeFileSync(this.currentTest.filename, script);
        console.log.reset();
    });

    afterEach(function() {
        fs.unlinkSync(this.currentTest.filename);
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
});


function equal(t, check, correct) {
    try {
        require(path.resolve('./', t.test.filename));
        process.stdin.emit('data', check);
        process.stdin.emit('end');
        assert.equal(getCalled(), correct);
    } catch (e) {
        addContext(t, {
            title: e.name,
            value: e.stack
        });

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