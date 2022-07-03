import { connect } from "react-redux";
import { search, cancel } from "../reducers/beersActions";
import { setConfig } from "../reducers/configActions";
import { BeersList } from "./beersList";

function Beers(props) {
  console.log(props);
  const { data, status, search, messages, cancel, setConfig, config } = props;
  return (
    <>
      <div className="App-inputs">
        <select
          name="per-page"
          defaultValue={config.perPage}
          onChange={(e) => setConfig({ perPage: Number(e.target.value) })}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
            return (
              <option key={value} value={value}>
                {value} results
              </option>
            );
          })}
        </select>
        <input
          type="text"
          placeholder="Search beers"
          onChange={(evt) => search(evt.target.value)}
        />
        {status === "pending" && (
          <>
            <button type="button" onClick={cancel}>
              Cancel
            </button>
            <span className="App-spinner">Loading...</span>
          </>
        )}
      </div>
      {status === "success" && (
        <div className="App-content">
          <BeersList beers={data} />
        </div>
      )}

      {status === "failure" && (
        <div className="App-content">{messages[0].text}</div>
      )}
    </>
  );
}

function mapState(state) {
  return {
    ...state.beers,
    config: state.config,
  };
}

export default connect(mapState, { search, cancel, setConfig })(Beers);
