import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';
import { Client } from './client/client';
import Layout from './layout/layout';
import messages from './messages';
import './styles/App.scss';

function App() {
  const [locale, setLocale] = useState('en');

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Layout setLocale={setLocale} />
    </IntlProvider>
  );
}

export default App;