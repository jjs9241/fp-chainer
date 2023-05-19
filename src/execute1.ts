import { Either } from "./simpleEither"

export const execute1 = (either0: Either<Error, undefined>) => {
  try {
      setTimeout(() => {
					const f0 = (n: number) => {
						console.log("1")
						throw new Error("2")
					}
					const g0 = (e:Error) => {
						console.log(e.message)
					}
					// blank // use parameter either0, function f0 and function g0!
          
      }, 0)
  } catch(e) {
      console.log("3")
  } finally {
      console.log("4")
  }
  console.log("5")
}