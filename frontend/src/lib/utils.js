import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

/**
 * A utility function to conditionally merge class names together.
 * It takes in a variable number of arguments and returns a single class name string.
 * The arguments can be any combination of:
 *   - a string
 *   - an object with boolean keys and string values
 *   - an array of strings and objects
 *
 * @example
 *   cn('bg-red-500', condition && 'bg-blue-500')
 *   cn({ 'bg-red-500': condition }, 'bg-blue-500')
 *   cn(['bg-red-500', condition && 'bg-blue-500'])
 *   cn(['bg-red-500', { 'bg-blue-500': condition }])
 *
 * @param {...(string|{[key: string]: boolean}|string[]|{[key: string]: boolean}[])} inputs
 * @return {string}
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
