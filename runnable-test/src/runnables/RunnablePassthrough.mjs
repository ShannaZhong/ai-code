import "dotenv/config";
import {
  RunnablePassthrough,
  RunnableLambda,
  RunnableSequence,
  RunnableMap,
} from "@langchain/core/runnables";

const chain = RunnableSequence.from([
  RunnableLambda.from((input) => ({ concept: input })),
  RunnableMap.from({
    original: new RunnablePassthrough(),
    processed: RunnableLambda.from((obj) => ({
      concept: input,
      upper: obj.concept.toUpperCase(),
      length: obj.concept.length,
    })),
  }),
]);

// 可简化
// const chain = RunnableSequence.from([
//   (input) => ({ concept: input }),
//   {
//     original: new RunnablePassthrough(),
//     processed: (obj) => ({
//       concept: input,
//       upper: obj.concept.toUpperCase(),
//       length: obj.concept.length,
//     }),
//   },
// ]);

// const chain1 = RunnableSequence.from([
//   (input) => ({ concept: input }),
//   // 合并新的属性，就像 Object.assign
//   RunnablePassthrough.assign({
//     original: new RunnablePassthrough(),
//     processed: (obj) => ({
//       concept: input,
//       upper: obj.concept.toUpperCase(),
//       length: obj.concept.length,
//     }),
//   }),
// ]);

const input = "神说要有光";
const result = await chain.invoke(input);
console.log(result);
