import React from "react";
import ReactDOM from "react-dom";
import * as config from "../config";
import App from "./App";
import { sleep } from "../util/General";

describe("Locale detection", () => {
  const div = document.createElement("div");

  beforeAll(() => {
    console.log("beforeAll");
  });

  it("default language, user denies geolocation API usage", () => {
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((cb, errorCb) =>
        errorCb({
          code: 1,
          message: "User denied Geolocation"
        })
      )
    };
    config.GOOGLE_MAP_API_KEY = "mock-api-key";
    const AppComponent = ReactDOM.render(<App />, div);
    expect(AppComponent.state.locale).toBe("en");
    ReactDOM.unmountComponentAtNode(div);
  });

  it(`ip lookup language,
  user allows, but geocoding API fails ('invalid api key')`, async () => {
    global.navigator.geolocation = {
      getCurrentPosition: jest.fn().mockImplementationOnce((cb, errorCb) =>
        Promise.resolve(
          cb({
            coords: {
              latitude: 100.0,
              longitude: 100.0
            }
          })
        )
      )
    };
    config.GOOGLE_MAP_API_KEY = "mock-api-key";
    const AppComponent = ReactDOM.render(<App />, div);
    await sleep(1000);
    expect(AppComponent.state.locale).toBe("ro");
    ReactDOM.unmountComponentAtNode(div);
  });

  it.skip(`ip lookup language, 
  geolocation API unavailable or missing geocoding provider API key`, async () => {
    config.GOOGLE_MAP_API_KEY = false;
    const AppComponent = ReactDOM.render(<App />, div);
    await sleep(1000);
    expect(AppComponent.state.locale).toBe("ro");
    ReactDOM.unmountComponentAtNode(div);
  });
});
