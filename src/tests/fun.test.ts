import { fun1, fun3, fun4 } from "./fun";

describe("fun test", () => {
  test("fun", () => {
    fun3.show();
    fun3.show();
    fun3.show();
  });
  // test("async", () => {
  //   let r = 0;
  //   fun4(1, 2, (a: number, b: number) => {
  //     r = a;
  //   });
  //   console.log("r=", r);
  // });
});