type Left<E>  = {
	type: "left";
	e: E;
}
type Right<A> = {
	type: "right";
	a: A;
}

type EitherInternal<E, A> =
  Left<E> |
  Right<A>;

function begin<E, A>(e: EitherInternal<E, A>): Either<E, A> {
  return new Either(e)
}

export function left<E>(e: E): Either<E, never> {
  return begin({ type: "left", e: e })
}

export function right<A>(a: A): Either<never, A> {
  return begin({ type: "right", a: a })
}

export class Either<E, A> {
  constructor(protected internal: EitherInternal<E, A>) {}

  chain<F, B>(f: (a: A) => Either<F, B>): Either<E | F, B> {
		try{
			if (this.internal.type === "left") {
				return this as unknown as Either<E, B>
			} else {
				return f(this.internal.a)
			}
		} catch(e) {
			return left(e)
		}
  }

	map<B>(f: (a: A) => B): Either<E, B> {
    return this.chain((a: A) => right(f(a)))
  }

  chainLeft<F, B>(f: (e: E) => Either<F, B>): Either<F, A | B> {
		try{
			if (this.internal.type === "left") {
				return f(this.internal.e)
			} else {
				return this as unknown as Either<F, A>
			}
		} catch(e) {
			return left(e)
		}
  }

	mapLeft<F>(f: (e: E) => F): Either<F, A> {
    return this.chainLeft((e: E) => left(f(e)))
  }

  orElse(f: (e: E) => A): A {
    if (this.internal.type === "left") {
      return f(this.internal.e)
    } else {
      return this.internal.a
    }
  }

  orNull(): A | undefined {
    if (this.internal.type === "left") {
      return undefined
    } else {
      return this.internal.a
    }
  }

  eval(): EitherInternal<E, A> {
    return this.internal
  }

  isRight(): boolean {
    return this.internal.type === "right"
  }

  isLeft(): boolean {
    return this.internal.type === "left"
  }
}

