export async function fetchJSON<T>(url: string): Promise<T> {
  console.info("Fetching JSON", url);
  const resp = await fetch(url);
  const data: any = await resp.json();
  return data;
}

export async function fetchPaginated<T>(
  url: string,
  limit = Infinity,
): Promise<T[]> {
  const results: T[] = [];
  let nextURL = url;
  let resp: any = null;
  do {
    resp = await fetchJSON(nextURL);
    results.push(...resp.results);
    if (process.env.SHORT) {
      nextURL = "";
    } else {
      nextURL = resp.next;
    }
  } while (nextURL && results.length < limit);
  if (Number.isFinite(limit)) {
    results.length = limit;
  }
  return results;
}
