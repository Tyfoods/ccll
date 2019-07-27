const visuallyUpdateVoteCounter = require("../functions/visuallyUpdateVoteCounter");

 var testVoteCounter = {
     "innerHTML": "",
     "textContent": "0"

 }

 it ("Visual incrementing works", ()=>{

    expect(visuallyUpdateVoteCounter("increment", testVoteCounter)).toBe(1)
 });

 it ("Visual decrementing works", ()=>{

    expect(visuallyUpdateVoteCounter("decrement", testVoteCounter)).toBe(-1)
 });