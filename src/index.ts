const execute0 = (timeout: number) => {
  try {
      setTimeout(() => {
          console.log("1")
          throw new Error("2")
      },timeout)
  } catch(e) {
      console.log("3")
  } finally {
      console.log("4")
  }
  console.log("5")
}
execute0(0)

import { Either, right } from "./simpleEither"

const execute1 = (timeout: number, count: Either<Error, number>) => {
  try {
      setTimeout(() => {
					const f0 = (n: number) => {
						console.log("1")
						throw new Error("2")
					}
					const g0 = (e:Error) => {
						console.log(e.message)
					}
					// use count 
          
      }, timeout)
  } catch(e) {
      console.log("3")
  } finally {
      console.log("4")
  }
  console.log("5")
}
//execute1(0, right(0))