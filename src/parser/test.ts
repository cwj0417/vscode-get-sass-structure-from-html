import parser from './index';

const assert = (boolean: boolean) => {
    if (!boolean) {
        throw new Error();
    }
};

// base case

const tpl = `<div className="l1">
<div className="l2">票税助手注意事项</div>
<div className="l2 active aaa">
  <div className="abc">cttt</div>
  票税助手注意事项
  <div className="l3 abcd">票税助手注意事项</div>
</div>
</div>`;

assert(parser(tpl) === '.l1{.l2{}.l2{&.active{}&.aaa{}.abc{}.l3{&.abcd{}}}}');