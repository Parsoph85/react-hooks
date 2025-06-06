import React from 'react'
import RenderCounter from './render-counter/RenderCounter';
import './TaskTwo.css';

export default function TaskTwo() {
    const update = useUpdate();

    return (
        <div className="TaskTwo">
            <button onClick={update}>Обновить компонент</button>
            {/*<RenderCounter />*/}
            <Root />
        </div>
    )
}

// Мемоизация компонента Root
const Root = React.memo(() => {
    const [value, setValue] = React.useState('');

    // useCallback для handleChange, чтобы не пересоздавать функцию при каждом рендере
    const handleChange = React.useCallback((event) => {
        setValue(event.target.value);
    }, []);

    return (
        <form className="form-container">
            Введенное значение: {value}
            {/*<RenderCounter />*/}
            <Input onChange={handleChange} />
        </form>
    );
});

// Мемоизация компонента Input
const Input = React.memo(({ onChange }) => {
    return (
        <div className="input-container">
            <input
                type="text"
                className="input-field"
                name="value"
                onChange={onChange}
            />
            {/*<RenderCounter />*/}
        </div>
    );
});

// Хук для обновления всего компонента TaskTwo
function useUpdate() {
    const [, setCount] = React.useState(0);
    return () => { setCount(c => c + 1); }
}
