import React from "react";
import { GOOGLE_MAP_API_KEY } from "../config";

export const DEFAULT_LANGUAGE = "en";

export class Localizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shouldLocalize: true
    };

    this.updateThroughIpLookUp = this.updateThroughIpLookUp.bind(this);
    this.updateUsingPosition = this.updateUsingPosition.bind(this);
  }

  componentDidMount() {
    if (this.props.shouldLocalize) {
      this.fetchCountryCode();
    }
  }

  async updateUsingPosition(position) {
    let countryCode = await getCountryCodeForCoord(position);
    this.props.updateLocale({ locale: countryCode });
  }

  async updateThroughIpLookUp() {
    let countryCode = await getCountryCodeThroughIpLookUp();
    this.props.updateLocale({ locale: countryCode });
  }

  fetchCountryCode = async () => {
    if ("geolocation" in navigator && GOOGLE_MAP_API_KEY) {
      return await navigator.geolocation.getCurrentPosition(
        this.updateUsingPosition,
        err => {
          // Localization denied, parent state shouldn't change
          console.log("navigator.geolocation.getCurrentPosition Denied", err);
        }
      );
    } else {
      return await this.updateThroughIpLookUp();
    }
  };

  render() {
    return null;
  }
}

function getCountryCodeForCoord({ latitude, longitude }) {
  const api_url = "https://maps.googleapis.com/maps/api/geocode/json";
  const request_url = `${api_url}?latlng=${latitude},${longitude}&key=${GOOGLE_MAP_API_KEY}`;

  return fetch(request_url)
    .then(response => {
      if (!response.ok) {
        throw Error(`Fetch failed for given url ${request_url}.
          Response: ${response.status}`);
      }
      const countryCodeData = response.results["address_components"].filter(
        addressComponent => {
          return addressComponent["types"][0] === "country"
            ? addressComponent["shortName"].toLowerCase()
            : false;
        }
      );
      return countryCodeData[0];
    })
    .catch(err => {
      console.log("Fallback over Ip lookup", err);
      return getCountryCodeThroughIpLookUp();
    });
}

export function getCountryCodeThroughIpLookUp() {
  const api_url = "http://ip-api.com/json";

  return fetch(api_url)
    .then(response => {
      console.log(response);
      return response.json().then(responseJson => {
        return responseJson["countryCode"];
      });
    })
    .catch(err => {
      console.log(err);
    });
}
