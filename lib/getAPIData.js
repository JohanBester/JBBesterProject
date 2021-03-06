import * as state from "../store";
import axios from "axios";
import env from "env";
import compareTheData from "./compareTheData";

//** GET Zip Code Data from API
export default function getAPIData() {
  let zipCode = state.Fmaresults.zipCode;
  let radius = state.Fmaresults.radius;
  let APIkey = "XGSIV5GV93YJPD7VVM8G"; // process.env.API_KEY

  axios
    .get(
      `https://api.zip-codes.com/ZipCodesAPI.svc/1.0/FindZipCodesInRadius?zipcode=${zipCode}&minimumradius=0&maximumradius=${radius}&key=${APIkey}`
    )
    .then(response => {
      state.Fmaresults.returnedAPIdata = response.data;
      if (response.status === 200) {
        // alert("Going to compare the Data"); // for testing
        compareTheData(
          state.Fmaresults.fmaDBdata,
          state.Fmaresults.returnedAPIdata
        );
        return true;
      }
    })
    .catch(err => {
      // What to do when the request fails
      alert(
        "There seems to be a problem with this search. Kindly please try that again."
      );
      console.log("Error", err);
    });
}
