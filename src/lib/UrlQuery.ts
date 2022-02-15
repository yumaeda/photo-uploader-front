/**
 * UrlQuery (Singleton)
 *
 * @author Yukitaka Maeda [yumaeda@gmail.com]
 */

/**
 * Interface for hash table
 */
interface IHashTable<T> {
    [key: string]: T;
}

/**
 * Hash table for storing URL query strings
 */
const queryHash: IHashTable<string> = {};

/**
 * Parse URL query strings
 *
 * @return void
 */
export function parse() {
    // Get a URL query string w/o '?'.
    const search = window.location.search;
    const query = (search && search.length > 1) ?
        decodeURI(search.substring(1)) :
        '';

    if (query !== '') {
        const keyValues = query.split('&');
        for (const keyValue of keyValues) {
            const tokens = keyValue.split('=');
            queryHash[tokens[0]] = (tokens.length === 2) ? tokens[1] : '';
        }
    }
}

/**
 * Get value of the specified URL query string
 *
 * @param string key
 * @return string value of the specified URL query string
 */
export function getValue(key: string): string {
    return queryHash[key] ? queryHash[key] : '';
}
