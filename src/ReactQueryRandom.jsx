import { useEffect, useReducer, useState } from "react";
import { useQuery } from "react-query";

const url =
  "https://www.random.org/integers/?num=1&min=1&max=100&col=5&base=10&format=plain&rnd=new";

export function ReactQueryRandom() {
  const fetchNumber = () => {
    return fetch(url).then((response) => {
      if (response.status !== 200) {
        throw new Error("Something went wrong. Try again.");
      }
      return response.text();
    });
  };

  const query = useQuery(["random"], fetchNumber);
  if (query.isError) return <p>Error: {query.error.message}</p>;

  return (
    <button onClick={() => query.refetch()}>
      Random Number: {query.isLoading || query.isFetching ? "..." : query.data}
    </button>
  );
  // const [key, forceUpdate] = useReducer((x) => x + 1, 0);
  // const [num, setNum] = useState();
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  //
  // useEffect(() => {
  //   setLoading(true);
  //   fetch(url)
  //     .then((response) => {
  //       if (response.status !== 200) {
  //         throw new Error(`Something went wrong. Try again.`);
  //       }
  //       return response.text();
  //     })
  //     .then((random) => {
  //       setNum(random);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       setError(error.message);
  //     });
  // }, [key]);

  //     return <p>Error: {error}</p>;
  //
  // return (
  //   <button onClick={() => forceUpdate()}>
  //     Random Number: {loading ? "..." : num}
  //   </button>
  // );
}
