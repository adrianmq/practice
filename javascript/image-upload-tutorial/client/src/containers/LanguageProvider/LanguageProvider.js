/* 
  LanguageProvider.js

  Source:
  https://github.com/react-boilerplate/react-boilerplate/blob/master/docs/general/introduction.md
*/
import React from "react";
import PropTypes from "prop-types";
import { IntlProvider } from "react-intl";

export function LanguageProvider(props) {
  return (
    <IntlProvider
      locale={props.locale}
      key={props.locale}
      messages={props.messages[props.locale]}
    >
      {React.Children.only(props.children)}
    </IntlProvider>
  );
}

LanguageProvider.propTypes = {
  locale: PropTypes.string,
  messages: PropTypes.object,
  children: PropTypes.element.isRequired
};
