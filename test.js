import addContext from 'mochawesome/addContext';
import assert from 'power-assert';
import sinon from 'sinon';
import fs from 'fs';
import path from 'path';

const script = fs.readFileSync('index.js').toString();

sinon.stub(console, 'log');

describe('Paiza Skill Tests', function() {


    beforeEach(() => {
        this.ctx.test.filename = this.ctx.test.title.replace(/\s/g, '-') + '.js';
        fs.writeFileSync(this.ctx.test.filename, script);
        console.log.reset();
    });

    afterEach(() => {
        fs.unlinkSync(this.ctx.test.filename);
        process.stdin.removeAllListeners('data');
        process.stdin.removeAllListeners('end');
    });


    /*
     checkにテストケース、correctに正解をいれていく
     正解の末尾改行はcorrectに含まない(console.logで改行されるため)
     */

    it('test 1', () => {
        const check = ``;
        const correct = ``;

        equal(check, correct);
    });

    it('test 2', () => {
        const check = ``;
        const correct = ``;

        equal(check, correct);
    });




    const equal = (check, correct) => {
        try {
            require(path.resolve('./', this.ctx.test.filename));
            process.stdin.emit('data', check);
            process.stdin.emit('end');
            assert.equal(getCalled(), correct);
        } catch (e) {
            if(e.name !== 'AssertionError') {
                addContext(this.ctx, {
                    title: e.name,
                    value: e.stack
                });
            }

            throw e;
        }
    };

    /**
     * 呼ばれたconsole.logの内容を改行でくっつけて返す
     * @return {string}
     */
    const getCalled = () => {
        const strs = [];
        for(let i = 0; i < console.log.callCount; i++) {
            strs.push(console.log.getCall(i).args[0]);
        }

        return strs.join('\n');
    }

});