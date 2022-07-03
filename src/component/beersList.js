export function BeersList(props) {
  console.log(props);

  const { beers: data, loading } = props;

  return (
    <>
      <div>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ul>
            {data?.map((beer) => (
              <li key={beer.id}>{beer.name}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
