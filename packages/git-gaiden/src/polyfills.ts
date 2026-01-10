/* eslint-disable unicorn/no-array-sort */

if (!Array.prototype.toSorted) {
	Array.prototype.toSorted = function <T>(
		compareFunction?: (a: T, b: T) => number,
	): T[] {
		return [...(this as T[])].sort(compareFunction);
	};
}
