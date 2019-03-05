import { flow, runInAction, when } from 'mobx';

export function conditionalAction<T extends any[]>(
  predicate: () => boolean,
  reaction: (...args: T) => void,
) {
  const functor = function(this: { cancel?: () => void }) {
    if (this.cancel) {
      this.cancel();
    }
    const f = flow(function*(...args: T) {
      yield when(predicate);
      runInAction(() => reaction.apply(null, args));
    });
    return (...args: T) => {
      const r = f.apply(this, args);
      this.cancel = r.cancel;
    };
  };
  return functor.call({});
}

export default conditionalAction;
