import parser from './index';

const assert = (boolean: boolean) => {
  if (!boolean) {
    }
};

// base case

// const tpl = `<div className="l1">
// <div className="l2">票税助手注意事项</div>
// <div className="l2 active aaa">
//   <div className="abc">cttt</div>
//   票税助手注意事项
//   <div className="l3 abcd">票税助手注意事项</div>
// </div>
// </div>`;

// assert(parser(tpl) === '.l1{.l2{}.l2{&.active{}&.aaa{}.abc{}.l3{&.abcd{}}}}');

// case closed tag

// const tpl = `<img /><div className="l1">
// <div className="l2">票税助手注意事项</div>
// <div className="l2 active aaa">
//   <div className="abc">cttt</div>
//   票税助手注意事项
//   <div className="l3 abcd">票税助手注意事项</div>
// </div>
// </div>`;

// case tag not match

// const tpl = `<div className="l1">
// <div className="l2"><span>票税助手注意事项</div>
// <div className="l2 active aaa">
//   <div className="abc">cttt</div>
//   票税助手注意事项
//   <div className="l3 abcd">票税助手注意事项</div>
// </div>
// </div>`;


const tpl = `
<div id="test">
  <div className="l2">票税助手注意事项</div>
  <div className="l2 active aaa">
    <div className="abc">cttt</div>
    票税助手注意事项
    <div className="l3 abcd">票税助手注意事项</div>
  </div>
</div>`;

assert(parser(tpl) === 
`#test {
  .l2 {

  }
  .l2.active.aaa {
     .abc {

     }
     .l3.abcd {

     }
  }
}`
);