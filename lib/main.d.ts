import * as React from 'react';
import './index.css';
declare type Country = {
    name: string;
    flag: string;
};
export interface InputCountryProps {
    onChange?(s: string): void;
    apiURL?: string;
    flagField?: string | ((resp: Array<any>) => string);
}
export interface InputCountryState {
    isEdit: boolean;
    countries: Array<Country>;
    value: string;
    index: number;
}
export declare class InputCountry extends React.PureComponent<InputCountryProps, InputCountryState> {
    static defaultProps: InputCountryProps;
    _flagField: string;
    countryList: React.RefObject<HTMLDivElement>;
    state: InputCountryState;
    constructor(props: InputCountryProps);
    fetchCountry(): Promise<any[]>;
    componentDidMount(): void;
    onChange(e: React.FormEvent<HTMLInputElement>): void;
    onKeyUp(evt: React.KeyboardEvent<HTMLInputElement>): void;
    onSelect(e: React.FormEvent<HTMLDivElement> | React.KeyboardEvent<HTMLInputElement>, country: string): void;
    setValue(val: string): void;
    hideList(event?: any): void;
    getFilterCoiuntries(): Country[];
    render(): JSX.Element;
}
export {};
