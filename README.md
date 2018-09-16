# iwutest

Текстовое поле с автокомплитом

## Install

Установка из npm
```
npm i -S iwutest
```
Импорт 
```
import { InputCountry } from 'iwutest'
```

## Использование

```javascript
  <InputCountry />
```
так же можно указать поле для флага и url
```javascript
  <InputCountry flagField="flag" apiURL="https://restcountries.eu/rest/v2/all" />
```

### onChange

```javascript
  <InputCountry onChange={name => this.setState({ country: name })} />
```

## License
MIT Licensed
