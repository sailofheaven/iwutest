import * as React from 'react';
import './index.css'

type Country = {
    name: string,
    flag: string
}
export interface InputCountryProps {
    onChange?(s: string): void,
    apiURL?: string
    flagField?: string | ((resp: Array<any>) => string)
}
export interface InputCountryState {
    isEdit: boolean,
    countries: Array<Country>,
    value: string,
    index: number
}

export class InputCountry extends React.PureComponent<InputCountryProps, InputCountryState>{
    static defaultProps: InputCountryProps = {
        apiURL: 'https://restcountries.eu/rest/v2/all',
        flagField: 'flag'
    }

    _flagField: string = ''
    countryList:React.RefObject<HTMLDivElement> 

    state: InputCountryState = {
        isEdit: false,
        countries: [],
        value: '',
        index: 0
    }


    constructor(props: InputCountryProps) {
        super(props)

        this.countryList = React.createRef();
    }

    async fetchCountry() {
        try {
            const { apiURL } = this.props;

            const response = await fetch(apiURL)
            const json = await response.json()

            return json instanceof Array ? json : []
        } catch (error) {
            throw Error('ошибка')
        }
    }

    componentDidMount() {
        const { flagField } = this.props;
        this.fetchCountry().then(json => {

            this._flagField = 'string' === typeof flagField ? flagField : flagField!(json)
            this.setState({
                countries: json
            })
        })
    }

    onChange(e: React.FormEvent<HTMLInputElement>) {

        this.setState({
            isEdit: true,
            index: 0
        })
        this.setValue(e.currentTarget.value)

    }

    onKeyUp(evt: React.KeyboardEvent<HTMLInputElement>) {
        const { index, countries, isEdit } = this.state
        if (!isEdit) return;
        evt.preventDefault();

        if (38 === evt.keyCode) {
            this.setState({ index: 0 === index ? countries.length - 1 : index - 1 })

        } else if (40 === evt.keyCode) {
            this.setState({ index: (index + 1) % countries.length })

        } else if (13 === evt.keyCode) {
            this.onSelect(evt, this.getFilterCoiuntries()[index].name);
        }
    }


    onSelect(e: React.FormEvent<HTMLDivElement> | React.KeyboardEvent<HTMLInputElement>, country: string) {
        e.preventDefault();
        this.setValue(country);
        this.hideList()
    }

    setValue(val: string) {
        this.setState({
            value: val
        })

        this.props.onChange && this.props.onChange(val);
    }

    hideList(event?: any) {
        if (!event || event.target !== this.countryList) {
            this.setState({
                isEdit: false
            });
        }
    }

    getFilterCoiuntries() {
        const { countries, value } = this.state;
        return countries.filter(country => country.name.match(new RegExp(value, 'i'))).slice(0, 6);
    }

    render() {
        const { isEdit, value, index } = this.state;

        return (
            <div className="input-country">
                <input
                    className="input-country__input"
                    type="text"
                    onBlur={e => this.hideList(e)}
                    value={value}
                    onChange={e => this.onChange(e)}
                    onKeyUp={e => this.onKeyUp(e)} />
                {isEdit &&
                    <div ref={this.countryList} className="input-country__list list">
                        {this.getFilterCoiuntries().map((country, ind) =>

                            <div
                                className={`list__item ${index === ind ? 'list__item--active' : ''}`}
                                key={country.name}
                                onMouseEnter={e => this.setState({ index: ind })}
                                onMouseDown={e => this.onSelect(e, country.name)}>
                                <span>
                                    <img
                                        className="list__img"
                                        src={country[this._flagField]} />
                                    <span className="list__span">{country.name}</span>
                                </span>
                            </div>
                        )}
                    </div>
                }
            </div>
        )
    }
}