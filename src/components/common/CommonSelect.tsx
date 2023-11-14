import ReactSelect, { ContainerProps, IndicatorsContainerProps, MenuProps, OptionProps, SelectInstance, SingleValueProps, StylesConfig, components } from "react-select"
import { SelectOption } from "../../interfaces/common.interface"
import { useRef } from "react";




interface CommonSelectProps {
    selectOptions: SelectOption[];
    initialSelectedOption: SelectOption;
    selectedItem?: SelectOption;
    id?: string;
    handleSelectChange: (changeOption:SelectOption) => void;
}

 /** react-select 의 커스텀 스타일 설정 */
 const customStyles: StylesConfig = {
    control: (provided, state) => ({
        ...provided,
        background: "#61666b",
        borderColor: "#61666b",
        minHeight: "28px",
        height: "28px",
        fontSize: "13px",
        color: "#fafafa",
        borderRadius: "0px",
        width: "280px",
        minWidth: "280px",
        border: state.isFocused ? "1px solid #28acfc" : 0,
        boxShadow: "none",
    }),
    valueContainer: provided => ({
        ...provided,
        height: "28px",
        padding: "0 6px",
    }),
    singleValue: provided => ({
        ...provided,
        color: "#fafafa",
        fontSize: "13px",
        marginBottom: "2px",
    }),
    input: provided => ({
        ...provided,
        margin: "0px",
        width: "260px",
    }),
    indicatorSeparator: () => ({
        display: "none",
    }),
    indicatorsContainer: provided => ({
        ...provided,
        height: "28px",
    }),
    dropdownIndicator: base => ({
        ...base,
        color: "#fafafa",
        "&:hover": {
            color: "hsl(0, 0%, 80%)",
        },
    }),
    option: (provided, state) => ({
        ...provided,
        fontSize: state.isSelected ? "14px" : "13px",
        fontWeight: state.isSelected ? "700" : "",
        background: "#61666b",
        borderColor: "#61666b",
        borderRadius: "0",
        "&:hover": {
            background: "rgba(40,172,252,.3)",
        },
    }),
    menu: provided => ({
        ...provided,
        borderRadius: "0",
        padding: "0",
        background: "#61666b",
    }),
};


const CommonSelect = (props: CommonSelectProps) => {


    const selectRef = useRef<SelectInstance | null>(null)

    const {selectOptions,initialSelectedOption, selectedItem, handleSelectChange, id, ...rest} = props;

    const handleSelectOptionChange = (changeOption:unknown): void => {
        handleSelectChange(changeOption as SelectOption)
    }

    /** react-select Select컴포넌트 속 Menu */
    const Menu = (props: MenuProps) => {
        const { children } = props;
        return (
            <components.Menu {...props}>
                <div data-testid={`${id}-menu`}>{children}</div>
            </components.Menu>
        );
    };
    /** react-select Select컴포넌트 속 Option */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const Option = (props: OptionProps<any>) => {
        return (
            <components.Option {...props}>
                <div data-testid={`${id}-option-${props.data.value}`}>{props.children}</div>
            </components.Option>
        );
    };

    /** react-select Select컴포넌트 속 IndicatorsContainer */
    const IndicatorsContainer = (props: IndicatorsContainerProps) => {
        return (
            <components.IndicatorsContainer {...props}>
                <div data-testid={`${id}-menubtn`}>{props.children}</div>
            </components.IndicatorsContainer>
        );
    };

    const SingleValue = (props: SingleValueProps) => {
        return (
            <components.SingleValue {...props}>
                <div data-testid={`${id}-singlevalue`}>{props.children}</div>
            </components.SingleValue>
        );
    };

    const SelectContainer = (props: ContainerProps) => {
        return (
            <components.SelectContainer {...props}>
                <div data-testid={`${id}-container`} style={{ width: "100%" }}>
                    {props.children}
                </div>
            </components.SelectContainer>
        );
    };

    return (
        <ReactSelect
            ref={selectRef}
            defaultValue={initialSelectedOption}
            isSearchable={false} 
            styles={customStyles} 
            options={selectOptions}
            onChange={handleSelectOptionChange} 
            value={selectedItem}
            components={{
                SelectContainer,
                Menu,
                Option,
                IndicatorsContainer,
                SingleValue,
            }} 
            {...rest}
        />
    )
}

export default CommonSelect