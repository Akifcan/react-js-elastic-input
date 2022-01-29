import { useState, useEffect, useRef } from 'react';

const ElasticInput = (props) => {

    const { inputClass, errorTextClass, helperTextClass, required, base, onChange, validator, value, helperText, ...htmlProps } = props

    const inputRef = useRef(null)

    useEffect(() => {
        if (required) {
            inputRef.current.setAttribute('not-valid', 'true')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [isError, setError] = useState(null)
    const checkIsValid = () => {
        const result = document.querySelectorAll(`[not-valid="true"]`).length ? false : true

        if (result) {
            const formIsValid = new CustomEvent('valid')
            base.current.dispatchEvent(formIsValid)
        } else {
            const formIsNotValid = new CustomEvent('notValid')
            base.current.dispatchEvent(formIsNotValid)
        }

    }

    return <div>
        <input className={inputClass} ref={inputRef} {...htmlProps} onChange={(e) => {
            onChange(e)
            const result = validator(e.target.value)
            if (result !== null) {
                inputRef.current.setAttribute('not-valid', 'true')
                setError(result)
            } else {
                inputRef.current.removeAttribute('not-valid')
                setError(null)
            }
            checkIsValid()
        }} />
        {isError && (
            <p className={errorTextClass}>{isError}</p>
        )}
        {!isError && helperText && (
            <p className={helperTextClass}>{helperText}</p>
        )}
    </div>
}

export default ElasticInput